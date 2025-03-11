import { BoardListViewEntity } from 'modules/data-access/entities';
import { ResponseDto } from 'types/classes';
import { ResponseCode, ResponseMessage } from 'types/enums';
import { BoardListItem } from 'types/interfaces';

export default class GetLatestListResponseDto extends ResponseDto {
    private latestList: BoardListItem[];

    constructor(boardListViewEntities: BoardListViewEntity[]) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        const latestList: BoardListItem[] = boardListViewEntities;
        this.latestList = latestList;
    }

    static success(boardListViewEntities: BoardListViewEntity[]) {
        return new GetLatestListResponseDto(boardListViewEntities);
    }
}