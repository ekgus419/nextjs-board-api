import { IsOptional } from 'class-validator';

export default class PatchProfileImageRequestDto {

    @IsOptional()
    profileImage: string | null;
}