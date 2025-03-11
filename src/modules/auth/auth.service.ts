import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto, SignUpRequestDto } from './dto/request';
import { SignInResponseDto, SignUpResponseDto } from './dto/response';
import { UserRepository } from 'modules/data-access/repository';
import { UserEntity } from 'modules/data-access/entities';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository
    ) {
    }

    async signUp(dto: SignUpRequestDto): Promise<SignUpResponseDto> {
        
        const { email, password, nickname, telNumber } = dto;
        
        // 검증
        const isExistEmail = await this.userRepository.existsByEmail(email);
        if (isExistEmail) SignUpResponseDto.duplicateEmail();

        const isExistNickName = await this.userRepository.existsByNickname(nickname);
        if (isExistNickName) SignUpResponseDto.duplicateNickname();

        const isExistTelNumber = await this.userRepository.existsByTelNumber(telNumber);
        if (isExistTelNumber) SignUpResponseDto.duplicateTelNumber();

        // 암호화 처리
        // 동일한 비밀번호도 다른 해시 값을 가지게 설정
        const salt = await bcrypt.genSalt();

        // 비밀번호와 솔트를 사용하여 해시된 비밀번호 생성
        const encodedPassword = await bcrypt.hash(password, salt);
        dto.password = encodedPassword;

        // user entity 생성
        const userEntity: UserEntity = { ...dto, profileImage: null };
        await this.userRepository.save(userEntity);

        return SignUpResponseDto.success();
    }

    async signIn(dto: SignInRequestDto): Promise<SignInResponseDto> {
        const { email, password } = dto;

        // 검증
        const userEntity = await this.userRepository.findByEmail(email);
        if (!userEntity) SignInResponseDto.signInFail();

        const encodedPassword = userEntity.password;
        const isMatched = await bcrypt.compare(password, encodedPassword);
        if (!isMatched) SignInResponseDto.signInFail();

        // jwt
        const payload = { sub: email };

        // token 생성
        const token = this.jwtService.sign(payload);

        return SignInResponseDto.success(token);
    }

}
