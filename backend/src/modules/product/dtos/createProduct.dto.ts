import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";
import { CategoryEntity } from "src/modules/category/database/category.entity";

export class CreateProductDto {


    @IsNotEmpty()
    product_name: string

    @IsNotEmpty()
    unit_price: number

    @IsNotEmpty()
    @Min(0)
    stock_quantity: number

    @IsString()
    description: string

    @IsString()
    image: string

    @IsNotEmpty()
    category_id: number


}