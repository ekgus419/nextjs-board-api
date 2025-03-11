import { GetPopularListResultSet } from "modules/data-access/entities/result-set";
import { ResponseDto } from "types/classes";
import { ResponseCode, ResponseMessage } from "types/enums";

export default class GetPopularListResponseDto extends ResponseDto {

    private popularWordList: string[];

    constructor(resultSets: GetPopularListResultSet[]) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        const popularWordList: string[] = resultSets.map(resultSet => resultSet.searchWord);
        this.popularWordList = popularWordList;
    }

    static success(resultSets: GetPopularListResultSet[]) {
        return new GetPopularListResponseDto(resultSets);
    }

}