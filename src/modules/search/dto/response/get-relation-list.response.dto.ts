import { GetRelationListResultSet } from "modules/data-access/entities/result-set";
import { ResponseDto } from "types/classes";
import { ResponseCode, ResponseMessage } from "types/enums";

export default class GetRelationListResponseDto extends ResponseDto {

    private relativeWordList: string[];

    constructor(resultSets: GetRelationListResultSet[]) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        const relativeWordList: string[] = resultSets.map(resultSet => resultSet.relationWord);
        this.relativeWordList = relativeWordList;
    }

    static success(resultSets: GetRelationListResultSet[]) {
        return new GetRelationListResponseDto(resultSets);
    }

}