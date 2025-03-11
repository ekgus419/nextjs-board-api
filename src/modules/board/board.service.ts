import { Injectable } from '@nestjs/common';
import { BoardListViewRepository, BoardRepository, CommentRepository, FavoriteRepository, ImageRepository, SearchLogRepository, UserRepository } from 'modules/data-access/repository';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './dto/request';
import { DeleteBoardResponseDto, GetBoardResponseDto, GetCommentListResponseDto, GetFavoriteListResponseDto, GetLatestListResponseDto, GetSearchistResponseDto, GetTop3ListResponseDto, GetUserBoardListResponseDto, IncreaseViewCountResponseDto, PatchBoardResponseDto, PostBoardResponseDto, PostCommentResponseDto, PutFavoriteResponseDto } from './dto/response';

@Injectable()
export class BoardService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly boardRepository: BoardRepository,
        private readonly imageRepository: ImageRepository,
        private readonly commentRepository: CommentRepository,
        private readonly favoriteRepository: FavoriteRepository,
        private readonly searchLogRepository: SearchLogRepository,
        private readonly boardListViewRepository: BoardListViewRepository,
    ) {}

    async postBoard(dto: PostBoardRequestDto, email: string): Promise<PostBoardResponseDto> {
        const isExistUser = await this.userRepository.existsByEmail(email);
        if (!isExistUser) PostBoardResponseDto.noExistUser();

        // 새 엔터티 인스턴스를 만든다.
        const boardEntity = this.boardRepository.create(dto, email);

        // 엔터티를 데이터베이스에 저장합니다.(없으면 insert, 있으면 update)
        await this.boardRepository.save(boardEntity);

        const { boardImageList } = dto;
        const { boardNumber }= boardEntity;
        
        const imageEntities = this.imageRepository.createAll(boardImageList, boardNumber);
        await this.imageRepository.saveAll(imageEntities);

        return PostBoardResponseDto.success();
    }

    async postComment(dto: PostCommentRequestDto, boardNumber: number, email: string): Promise<PostCommentResponseDto> {
        const isExistUser = await this.userRepository.existsByEmail(email);
        if (!isExistUser) PostCommentResponseDto.noExistUser();

        const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);
        if(!boardEntity) PostCommentResponseDto.noExistBoard();

        const commentEntity = this.commentRepository.create(dto, boardNumber, email);
        await this.commentRepository.save(commentEntity);

        boardEntity.commentCount++;
        await this.boardRepository.save(boardEntity);

        return PostCommentResponseDto.success();
    }
    
    async getLatestList(): Promise<GetLatestListResponseDto> {
        const boardListViewEntities = await this.boardListViewRepository.getLatestList();
        return GetLatestListResponseDto.success(boardListViewEntities);
    }

    async getTop3List(): Promise<GetTop3ListResponseDto> {
        const boardListViewEntities = await this.boardListViewRepository.getTop3List();
        return GetTop3ListResponseDto.success(boardListViewEntities);
    }

    async getSearchList(searchWord: string, preSearchWord: string | undefined): Promise<GetSearchistResponseDto> {
        
        const boardListViewEntities = await this.boardListViewRepository.getSearchList(searchWord);

        preSearchWord = preSearchWord ? preSearchWord : null;

        let searchLogEntity = this.searchLogRepository.create(searchWord, preSearchWord, false);
        await this.searchLogRepository.save(searchLogEntity);

        const relation = preSearchWord ? true : false;
        if (relation) {
            searchLogEntity = this.searchLogRepository.create(preSearchWord, searchWord, true);
            await this.searchLogRepository.save(searchLogEntity);
        }

        return GetSearchistResponseDto.success(boardListViewEntities);
    }

    async getUserBoardList(email: string): Promise<GetUserBoardListResponseDto> {

        const isExistUser = await this.userRepository.existsByEmail(email);
        if (!isExistUser) GetUserBoardListResponseDto.noExistUser();
        
        const boardListViewEntities = await this.boardListViewRepository.getUserBoardList(email);

        return GetUserBoardListResponseDto.success(boardListViewEntities);
    }


    async getBoard(boardNumber: number): Promise<GetBoardResponseDto> {
        const resultSet = await this.boardRepository.getBoard(boardNumber);
        if (!resultSet) GetBoardResponseDto.noExistBoard();

        const imageEntities = await this.imageRepository.findByBoardNumber(boardNumber);

        return GetBoardResponseDto.success(resultSet, imageEntities);
    }

    async increaseViewCount(boardNumber: number): Promise<IncreaseViewCountResponseDto> {
        const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);
        if(!boardEntity) IncreaseViewCountResponseDto.noExistBoard();

        boardEntity.viewCount++;
        await this.boardRepository.save(boardEntity);

        return IncreaseViewCountResponseDto.success();
    }

    async getCommentList(boardNumber: number): Promise<GetCommentListResponseDto> {

        const isExistBoard = this.boardRepository.existsByBoardNumber(boardNumber);
        if (!isExistBoard) GetCommentListResponseDto.noExistBoard();

        const resultSet = await this.commentRepository.getCommentList(boardNumber);

        return GetCommentListResponseDto.success(resultSet);
    }

    async getFavoriteList(boardNumber: number): Promise<GetFavoriteListResponseDto> {

        const isExistBoard = this.boardRepository.existsByBoardNumber(boardNumber);
        if (!isExistBoard) GetFavoriteListResponseDto.noExistBoard();

        const resultSets = await this.favoriteRepository.getFavoriteList(boardNumber);

        return GetFavoriteListResponseDto.success(resultSets);
    }

    async patchBoard(dto: PatchBoardRequestDto, boardNumber: number, email: string): Promise<PatchBoardResponseDto> {
        const isExistUser = await this.userRepository.existsByEmail(email);
        if (!isExistUser) PatchBoardResponseDto.noExistUser();

        const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);
        if(!boardEntity) PatchBoardResponseDto.noExistBoard();

        const { writerEmail } = boardEntity;
        const isWriter = writerEmail === email;
        if (!isWriter) PatchBoardResponseDto.noPermission();

        boardEntity.title = dto.title;
        boardEntity.content = dto.content;
        await this.boardRepository.save(boardEntity);

        await this.imageRepository.deleteByBoardNumber(boardNumber);

        const { boardImageList } = dto;
        const imageEntities = this.imageRepository.createAll(boardImageList, boardNumber);
        await this.imageRepository.saveAll(imageEntities);

        return PatchBoardResponseDto.success();
    }

    async putFavorite(boardNumber: number, email: string): Promise<PutFavoriteResponseDto> {
        const isExistUser = await this.userRepository.existsByEmail(email);
        if (!isExistUser) PutFavoriteResponseDto.noExistUser();

        const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);
        if(!boardEntity) PutFavoriteResponseDto.noExistBoard();

        const isExistFavorite = await this.favoriteRepository.existsByBoardNumberAndUserEmail(boardNumber, email);
        if (isExistFavorite) {
            // 기존에 게시물 번호와 작성자로 좋아요 된게 있다면 삭제
            await this.favoriteRepository.deleteByBoardNumberAndUserEmail(boardNumber, email);
            // 좋아요 해제
            boardEntity.favoriteCount--;
        } else {
            const favoriteEntity = this.favoriteRepository.create(boardNumber, email);
            // 기존에 게시물 번호와 작성자로 좋아요 된게 없다면 생성
            await this.favoriteRepository.save(favoriteEntity);
            // 좋아요 설정
            boardEntity.favoriteCount++;
        }

        await this.boardRepository.save(boardEntity);
        return PutFavoriteResponseDto.success();
    }

    async deleteBoard(boardNumber: number, email: string): Promise<DeleteBoardResponseDto> {
        const isExistUser = await this.userRepository.existsByEmail(email);
        if (!isExistUser) DeleteBoardResponseDto.noExistUser();

        const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);
        if(!boardEntity) DeleteBoardResponseDto.noExistBoard();

        const isWriter = boardEntity.writerEmail === email;
        if (!isWriter) DeleteBoardResponseDto.noPermission();

        await this.imageRepository.deleteByBoardNumber(boardNumber);
        await this.favoriteRepository.deleteByBoardNumber(boardNumber);
        await this.commentRepository.deleteByBoardNumber(boardNumber);
        await this.boardRepository.deleteByBoardNumber(boardNumber);

        return DeleteBoardResponseDto.success();
    }

}
