import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, Length, MinLength, minLength } from "class-validator";

export class UpdateUserDto {

    @IsNotEmpty()
    fullname: string

    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    address: string

    @IsNotEmpty()
    username: string

}