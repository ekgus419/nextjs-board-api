import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from './dto/request';
import { SignInResponseDto, SignUpResponseDto } from './dto/response';

@Controller('/api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // 회원가입
    @Post('/sign-up')
    signUp(@Body() requestBody: SignUpRequestDto): Promise<SignUpResponseDto> {
        const response = this.authService.signUp(requestBody);
        return response;
    }

    // 로그인
    @Post('/sign-in')
    signIn(@Body() requestBody: SignInRequestDto): Promise<SignInResponseDto> {
        const response = this.authService.signIn(requestBody);
        return response;
    }


}
