import { UnauthorizedException } from '@nestjs/common';
import { ResponseDto } from 'types/classes';
import { ResponseCode, ResponseMessage } from 'types/enums';

export default class SignInResponseDto extends ResponseDto {
    private token: string;
    private expirationTime: number;

    constructor(token: string) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.token = token;
        this.expirationTime = 3600;
    }

    static success(token: string) {
        return new SignInResponseDto(token);
    }

    static signInFail() {
        throw new UnauthorizedException(new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL));
    }
}