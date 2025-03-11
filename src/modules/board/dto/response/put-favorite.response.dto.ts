import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ResponseDto } from 'types/classes';
import { ResponseCode, ResponseMessage } from 'types/enums';

export default class PutFavoriteResponseDto extends ResponseDto {
    constructor() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS)
    }

    static success() {
        return new PutFavoriteResponseDto();
    }

    static noExistBoard() {
        throw new BadRequestException(new ResponseDto(ResponseCode.NO_EXIST_BOARD, ResponseMessage.NO_EXIST_BOARD));
    }

    static noExistUser() {
        throw new UnauthorizedException(new ResponseDto(ResponseCode.NO_EXIST_USER, ResponseMessage.NO_EXIST_USER));
    }
}