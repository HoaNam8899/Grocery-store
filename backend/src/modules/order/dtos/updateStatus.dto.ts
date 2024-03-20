import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";


export class updateStatusDto {

    @IsNotEmpty()
    order_id: number;

    @IsNumber()
    status: number

    @IsString()
    receive_name: string

    @IsString()
    receive_address: string

    @IsString()
    receive_phone: string

    @IsString()
    note: string
}