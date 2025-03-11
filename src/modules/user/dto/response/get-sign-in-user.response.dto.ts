import { BadRequestException } from '@nestjs/common';
import { UserEntity } from 'modules/data-access/entities';
import { ResponseDto } from 'types/classes';
import { ResponseCode, ResponseMessage } from 'types/enums';

export default class GetSignInUserResponseDto extends ResponseDto {
    private email: string;
    private nickname: string;
    private profileImage: string | null;

    constructor({ email, nickname, profileImage }: UserEntity) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        this.email = email;
        this.nickname= nickname;
        this.profileImage = profileImage;
    }

    static success(userEntity: UserEntity) {
        return new GetSignInUserResponseDto(userEntity);
    }

    static noExistUser() {
        return new BadRequestException(new ResponseDto(ResponseCode.NO_EXIST_USER, ResponseMessage.NO_EXIST_USER));
    }
}