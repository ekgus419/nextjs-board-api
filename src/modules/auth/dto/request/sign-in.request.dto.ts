import { IsNotEmpty } from 'class-validator';

export default class SignInRequestDto {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}