import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";


export class CreateCategoryDto {

    @IsNotEmpty()
    category_name: string

    @IsString()
    description: string

    @IsString()
    status: boolean

}