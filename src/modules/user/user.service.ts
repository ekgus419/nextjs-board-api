import { Injectable } from '@nestjs/common';
import { GetSignInUserResponseDto, GetUserResponseDto, PatchNicknameResponseDto, PatchProfileImageResponseDto } from './dto/response';
import { UserRepository } from 'modules/data-access/repository';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from './dto/request';

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async getUser(email: string): Promise<GetUserResponseDto> {
        const userEntity = await this.userRepository.findByEmail(email);
        if (!userEntity) GetUserResponseDto.noExistUser();

        return GetUserResponseDto.success(userEntity);
    }

    async getSignInUser(email: string): Promise<GetSignInUserResponseDto> {
        const userEntity = await this.userRepository.findByEmail(email);
        if (!userEntity) GetSignInUserResponseDto.noExistUser();

        return GetSignInUserResponseDto.success(userEntity);
    }

    async patchNickname(dto: PatchNicknameRequestDto, email: string): Promise<PatchNicknameResponseDto> {
        const userEntity = await this.userRepository.findByEmail(email);
        if (!userEntity) PatchNicknameResponseDto.noExistUser();

        const { nickname } = dto;
        const isExistNickname = await this.userRepository.existsByNickname(nickname);
        if (isExistNickname) PatchNicknameResponseDto.duplicateNickname();

        userEntity.nickname = nickname;
        await this.userRepository.save(userEntity);

        return PatchNicknameResponseDto.success();
    }

    async patchProfileImage(dto: PatchProfileImageRequestDto, email: string): Promise<PatchProfileImageResponseDto> {
        const userEntity = await this.userRepository.findByEmail(email);
        if (!userEntity) PatchProfileImageResponseDto.noExistUser();

        const { profileImage } = dto;

        userEntity.profileImage = profileImage ? profileImage : null;
        await this.userRepository.save(userEntity);

        return PatchProfileImageResponseDto.success();
    }

}
