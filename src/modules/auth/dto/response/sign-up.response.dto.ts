import { BadRequestException } from '@nestjs/common';
import { ResponseDto } from 'types/classes';
import { ResponseCode, ResponseMessage } from 'types/enums';

export default class SignUpResponseDto extends ResponseDto {

    constructor() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    static success() {
        return new SignUpResponseDto();
    }

    static duplicateEmail() {
        throw new BadRequestException(new ResponseDto(ResponseCode.DUPLICATE_EMAIL, ResponseMessage.DUPLICATE_EMAIL));
    }

    static duplicateNickname() {
        throw new BadRequestException(new ResponseDto(ResponseCode.DUPLICATE_NICKNAME, ResponseMessage.DUPLICATE_NICKNAME));
    }

    static duplicateTelNumber() {
        throw new BadRequestException(new ResponseDto(ResponseCode.DUPLICATE_TEL_NUMBER, ResponseMessage.DUPLICATE_TEL_NUMBER));
    }

}