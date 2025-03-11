import { BadRequestException } from '@nestjs/common';
import { ImageEntity } from 'modules/data-access/entities';
import { GetBoardResultSet } from 'modules/data-access/entities/result-set';
import { ResponseDto } from 'types/classes';
import { ResponseCode, ResponseMessage } from 'types/enums';

export default class GetBoardResponseDto extends ResponseDto {
    private boardNumber: number;
    private title : string;
    private content : string;
    private boardImageList : string[];
    private writeDatetime : string;
    private writerEmail : string;
    private writerNickname : string;
    private writerProfileImage : string | null;

    constructor(resultSet: GetBoardResultSet, imageEntities: ImageEntity[]) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        const boardImageList: string[] = imageEntities.map(imageEntiy => imageEntiy.image);

        this.boardNumber = resultSet.boardNumber;
        this.title = resultSet.title;
        this.content = resultSet.content;
        this.boardImageList = boardImageList;
        this.writeDatetime = resultSet.writeDatetime;
        this.writerEmail = resultSet.writerEmail;
        this.writerNickname = resultSet.writerNickname;
        this.writerProfileImage = resultSet.writerProfileImage;
    }

    static success(resultSet: GetBoardResultSet, imageEntities: ImageEntity[]) {
        return new GetBoardResponseDto(resultSet, imageEntities);
    }

    static noExistBoard() {
        throw new BadRequestException(new ResponseDto(ResponseCode.NO_EXIST_BOARD, ResponseMessage.NO_EXIST_BOARD));
    }
}