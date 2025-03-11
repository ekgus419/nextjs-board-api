import { BoardListViewEntity } from 'modules/data-access/entities';
import { ResponseDto } from 'types/classes';
import { ResponseCode, ResponseMessage } from 'types/enums';
import { BoardListItem } from 'types/interfaces';

export default class GetTop3ListResponseDto extends ResponseDto {
    private top3List: BoardListItem[];

    constructor(boardListViewEntities: BoardListViewEntity[]) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        const top3List: BoardListItem[] = boardListViewEntities;
        this.top3List = top3List;
    }

    static success(boardListViewEntities: BoardListViewEntity[]) {
        return new GetTop3ListResponseDto(boardListViewEntities);
    }
}