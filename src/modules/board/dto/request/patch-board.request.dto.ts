import { IsArray, IsNotEmpty } from 'class-validator';

export default class PatchBoardRequestDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsArray()
    boardImageList: string[];
}