import { BadRequestException } from '@nestjs/common';
import { ResponseDto } from 'types/classes'
import { ResponseCode, ResponseMessage } from 'types/enums';

export default class IncreaseViewCountResponseDto extends ResponseDto {
    constructor() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    static success() {
        return new IncreaseViewCountResponseDto();
    }

    static noExistBoard() {
        throw new BadRequestException(new ResponseDto(ResponseCode.NO_EXIST_BOARD, ResponseMessage.NO_EXIST_BOARD));
    }
}