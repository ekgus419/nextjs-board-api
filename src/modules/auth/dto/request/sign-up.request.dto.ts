import { Equals, IsBoolean, IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';

export default class SignUpRequestDto {
    @IsNotEmpty() 
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    nickname: string;

    @IsNotEmpty()
    @Matches(/^[0-9]{11,13}$/)
    telNumber: string;

    @IsNotEmpty()
    address: string;

    @IsOptional()
    addressDetail: string | null;

    @IsBoolean()
    @Equals(true)
    agreedPersonal: boolean;
}