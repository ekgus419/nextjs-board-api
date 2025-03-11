import { BoardListViewEntity } from 'modules/data-access/entities';
import { ResponseDto } from 'types/classes';
import { ResponseCode, ResponseMessage } from 'types/enums';
import { BoardListItem } from 'types/interfaces';

export default class GetSearchistResponseDto extends ResponseDto {
    private searchList: BoardListItem[];

    constructor(boardListViewEntities: BoardListViewEntity[]) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        const searchList: BoardListItem[] = boardListViewEntities;
        this.searchList = searchList;
    }

    static success(boardListViewEntities: BoardListViewEntity[]) {
        return new GetSearchistResponseDto(boardListViewEntities);
    }
}