import { BadRequestException } from '@nestjs/common';
import { BoardListViewEntity } from 'modules/data-access/entities';
import { ResponseDto } from 'types/classes';
import { ResponseCode, ResponseMessage } from 'types/enums';
import { BoardListItem } from 'types/interfaces';

export default class GetUserBoardListResponseDto extends ResponseDto {
    private userBoardList: BoardListItem[];

    constructor(boardListViewEntities: BoardListViewEntity[]) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        const userBoardList: BoardListItem[] = boardListViewEntities;
        this.userBoardList = userBoardList;
    }

    static success(boardListViewEntities: BoardListViewEntity[]) {
        return new GetUserBoardListResponseDto(boardListViewEntities);
    }

    static noExistUser() {
        throw new BadRequestException(new ResponseDto(ResponseCode.NO_EXIST_USER, ResponseMessage.NO_EXIST_USER));
    }
}