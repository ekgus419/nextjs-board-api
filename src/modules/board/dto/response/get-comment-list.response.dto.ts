import { BadRequestException } from "@nestjs/common";
import { GetCommentListResultSet } from "modules/data-access/entities/result-set";
import { ResponseDto } from "types/classes";
import { ResponseCode, ResponseMessage } from "types/enums";
import { CommentListItem } from "types/interfaces";

export default class GetCommentListResponseDto extends ResponseDto {
    private commentList: CommentListItem[];

    constructor(
        resultSets: GetCommentListResultSet[]
    ) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS)
        const commentList: CommentListItem[] = resultSets;
        this.commentList = commentList;
    }

    static success(resultSets: GetCommentListResultSet[]) {
        return new GetCommentListResponseDto(resultSets);
    }

    static noExistBoard() {
        throw new BadRequestException(new ResponseDto(ResponseCode.NO_EXIST_BOARD, ResponseMessage.NO_EXIST_BOARD));
    }

}