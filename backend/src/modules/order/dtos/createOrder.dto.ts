import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";
import { ProductInfo } from "src/constant/productInfo/productInfo";

// import { CategoryEntity } from "src/modules/category/database/category.entity";
import { CreateOrderProductDto } from "./createOrderProduct.dto";

export class CreateOrderDto {


    @IsNotEmpty()
    total_price: number;

    @IsNotEmpty()
    receive_name: string

    @IsNotEmpty()
    receive_address: string

    @IsNotEmpty()
    receive_phone: string

    @IsNotEmpty()
    user_id: number

    @IsString()
    note: string

    @IsArray()
    productInfo: CreateOrderProductDto[];

}