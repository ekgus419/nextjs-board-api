import { IsNotEmpty } from 'class-validator';

export default class PostCommentRequestDto {

    @IsNotEmpty()
    content: string;

}