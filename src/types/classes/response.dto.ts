// 공통 반환 Dto
import { InternalServerErrorException } from '@nestjs/common';
import { ResponseCode, ResponseMessage } from 'types/enums';

export default class ResponseDto {
    constructor(
        private readonly code: ResponseCode,
        private readonly message: ResponseMessage
    ) {}

    static databaseError() {
        throw new InternalServerErrorException(new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR));
    }

}