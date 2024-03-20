import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";


export class CreateAdminDto {

    @IsNotEmpty()
    admin: string

    @IsNotEmpty()
    password: string

}