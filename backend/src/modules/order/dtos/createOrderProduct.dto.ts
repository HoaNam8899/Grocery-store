import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";
import { ProductInfo } from "src/constant/productInfo/productInfo";

// import { CategoryEntity } from "src/modules/category/database/category.entity";

export class CreateOrderProductDto {


    @IsNotEmpty()
    product_name: string;

    @IsNotEmpty()
    unit_price: number

    @IsNotEmpty()
    order_quantity: number

    @IsNotEmpty()
    product_id: number

}