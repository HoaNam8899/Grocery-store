import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, Length, MinLength, minLength } from "class-validator";

export class UpdatePasswordDto {

    @IsNotEmpty()
    @Length(8, 20)
    password: string

    @IsNotEmpty()
    oldPassword: string

}