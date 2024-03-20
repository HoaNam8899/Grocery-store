import { Expose } from "class-transformer";


export class ProductDtoForGetOne {
    @Expose()
    product_id: number

    @Expose()
    product_name: string

    @Expose()
    description: string

    @Expose()
    unit_price: number

    @Expose()
    stock_quantity: number

    @Expose()
    status: boolean

    @Expose()
    image: string

}