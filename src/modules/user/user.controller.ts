import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetSignInUserResponseDto, GetUserResponseDto, PatchProfileImageResponseDto } from './dto/response';
import { GetSignInUser } from 'decorator';
import JwtAuthGuard from 'guard/jwt-auth.guard';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from './dto/request';
import { PatchBoardResponseDto } from 'modules/board/dto/response';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 특정 유저 정보 불러오기
  @Get('/:email')
  getUser(@Param('email') email: string): Promise<GetUserResponseDto> {
    const response = this.userService.getUser(email);
    return response;
  }

  // 로그인 유저 정보 불러오기
  @Get()
  @UseGuards(JwtAuthGuard)
  getSignInUser(
    @GetSignInUser() email: string
  ): Promise<GetSignInUserResponseDto> {
    const response = this.userService.getSignInUser(email);
    return response;
  }

  // 닉네임 수정하기
  @Patch('/nickname')
  @UseGuards(JwtAuthGuard)
  patchNickname(@Body() requestBody: PatchNicknameRequestDto, @GetSignInUser() email: string): Promise<PatchBoardResponseDto> {
    const response = this.userService.patchNickname(requestBody, email);
    return response;
  }

  // 프로필 수정하기
  @Patch('/profime-image')
  @UseGuards(JwtAuthGuard)
  patchProfileImage(@Body() requestBody: PatchProfileImageRequestDto, @GetSignInUser() email: string): Promise<PatchProfileImageResponseDto> {
    const response = this.userService.patchProfileImage(requestBody, email);
    return response;
  }

}
