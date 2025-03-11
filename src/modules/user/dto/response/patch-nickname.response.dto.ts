import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { ResponseDto } from "types/classes"
import { ResponseCode, ResponseMessage } from "types/enums"

export default class PatchNicknameResponseDto extends ResponseDto {

    constructor() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    static success() {
        return new PatchNicknameResponseDto();
    }

    static duplicateNickname() {
        throw new BadRequestException(new ResponseDto(ResponseCode.DUPLICATE_NICKNAME, ResponseMessage.DUPLICATE_NICKNAME));
    }

    static noExistUser() {
        throw new UnauthorizedException(new ResponseDto(ResponseCode.NO_EXIST_USER, ResponseMessage.NO_EXIST_USER));
    }

}