import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import JwtAuthGuard from 'guard/jwt-auth.guard';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './dto/request';
import { GetSignInUser } from 'decorator';
import { GetBoardResponseDto, GetCommentListResponseDto, GetFavoriteListResponseDto, GetLatestListResponseDto, GetSearchistResponseDto, GetTop3ListResponseDto, GetUserBoardListResponseDto, IncreaseViewCountResponseDto, PatchBoardResponseDto, PostBoardResponseDto, PostCommentResponseDto, PutFavoriteResponseDto } from './dto/response';

@Controller('/api/v1/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 게시물 등록
  @Post()
  @UseGuards(JwtAuthGuard)
  postBoard(
    @Body() requestBody: PostBoardRequestDto,
    @GetSignInUser() email: string
  ): Promise<PostBoardResponseDto> {
    const response = this.boardService.postBoard(requestBody, email);
    return response;
  }

  // 댓글 등록
  @Post('/:boardNumber/comment')
  @UseGuards(JwtAuthGuard)
  postComment(
    @Body() requestBody: PostCommentRequestDto,
    @Param('boardNumber') boardNumber: number, 
    @GetSignInUser() email: string
  ): Promise<PostCommentResponseDto> {
    const response = this.boardService.postComment(requestBody, boardNumber, email);
    return response;
  }
  
  // 최신 게시물 리스트 가져오기
  @Get('/latest-list')
  getLatestList(): Promise<GetLatestListResponseDto> {
    const response = this.boardService.getLatestList();
    return response;
  }

  // 주간 Top 3 리스트 가져오기
  @Get('/top-3')
  getTop3List(): Promise<GetTop3ListResponseDto> {
    const response = this.boardService.getTop3List();
    return response;
  }

  // 검색 게시물 리스트 가져오기
  @Get(['/search-list/:searchWord', '/search-list/:searchWord/:preSearchWord'])
  getSearchList(@Param('searchWord') searchWord: string, @Param('preSearchWord') preSearchWord: string): Promise<GetSearchistResponseDto> {
    // http://localhost:4100/api/v1/board/search-list/오늘
    // http://localhost:4100/api/v1/board/search-list/잘가/오늘 -> 연관검색어시사용
    const response = this.boardService.getSearchList(searchWord, preSearchWord);
    return response;
  }

  // 특정 유저 게시물 리스트 가져오기
  @Get('/user-board-list/:email')
  getUserBoardList(@Param('email') email: string): Promise<GetUserBoardListResponseDto> {
    const response = this.boardService.getUserBoardList(email);
    return response;
  }

  // 특정 게시물 가져오기
  @Get('/:boardNumber')
  getBoard(@Param('boardNumber') boardNumber: number): Promise<GetBoardResponseDto> {
    const response = this.boardService.getBoard(boardNumber);
    return response;
  }

  // 조회수 증가
  @Get('/:boardNumber/increase-view-count')
  increaseViewCount(@Param('boardNumber') boardNumber: number): Promise<IncreaseViewCountResponseDto> {
    const response = this.boardService.increaseViewCount(boardNumber);
    return response;
  }

  // 댓글 리스트 가져오기
  @Get('/:boardNumber/comment-list')
  getCommentList(@Param('boardNumber') boardNumber: number): Promise<GetCommentListResponseDto> {
    const response = this.boardService.getCommentList(boardNumber);
    return response;
  }

  // 좋아요 리스트 가져오기
  @Get('/:boardNumber/favorite-list')
  getFavoriteList(@Param('boardNumber') boardNumber: number): Promise<GetFavoriteListResponseDto> {
    const response = this.boardService.getFavoriteList(boardNumber);
    return response;
  }

  // 게시물 수정
  @Patch('/:boardNumber')
  @UseGuards(JwtAuthGuard)
  patchBoard(
    @Body() requestBody: PatchBoardRequestDto, 
    @Param('boardNumber') boardNumber: number, 
    @GetSignInUser() email: string
  ): Promise<PatchBoardResponseDto> {
    const response = this.boardService.patchBoard(requestBody, boardNumber, email);
    return response;
  }

  // 좋아요 기능 설정
  @Put('/:boardNumber/favorite')
  @UseGuards(JwtAuthGuard)
  putFavorite(
    @Param('boardNumber') boardNumber: number, 
    @GetSignInUser() email: string
  ): Promise<PutFavoriteResponseDto> {
    const response = this.boardService.putFavorite(boardNumber, email);
    return response;
  }

  // 게시물 삭제
  @Delete('/:boardNumber')
  @UseGuards(JwtAuthGuard)
  deleteBoard(
    @Param('boardNumber') boardNumber: number, 
    @GetSignInUser() email: string
  ): Promise<PutFavoriteResponseDto> {
    const response = this.boardService.deleteBoard(boardNumber, email);
    return response;
  }

}
