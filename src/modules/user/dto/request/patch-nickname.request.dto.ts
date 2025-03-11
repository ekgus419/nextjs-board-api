import { IsNotEmpty } from "class-validator";

export default class PatchNicknameRequestDto {

    @IsNotEmpty()
    nickname: string;
}