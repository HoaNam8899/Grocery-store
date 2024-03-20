import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";


export class UpdateCategoryDto {

    @IsNotEmpty()
    category_name: string

    @IsString()
    description: string

    @IsBoolean()
    status: boolean
}