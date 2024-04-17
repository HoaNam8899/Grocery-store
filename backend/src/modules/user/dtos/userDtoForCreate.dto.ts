import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, Length, MinLength, minLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(1)
    username: string

    @IsNotEmpty()
    fullname: string

    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    address: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(8, 20)
    password: string

}