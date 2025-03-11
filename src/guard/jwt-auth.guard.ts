import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ResponseDto } from "types/classes";
import { ResponseCode, ResponseMessage } from "types/enums";

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) throw err || new UnauthorizedException(new ResponseDto(ResponseCode.AUTHORIZATION_FAIL, ResponseMessage.AUTHORIZATION_FAIL))
        return user;
    }
    
}