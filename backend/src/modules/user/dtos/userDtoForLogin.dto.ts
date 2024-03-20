import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, Length, MinLength, minLength } from "class-validator";

export class LoginUserDto {

    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(8, 20)
    password: string

}