import { Expose } from "class-transformer";

export class ProductDtoForReturn {
    @Expose()
    product_id: number

    @Expose()
    product_name: string

    @Expose()
    sku: string

    @Expose()
    description: string

    @Expose()
    unit_price: number

    @Expose()
    stock_quantity: number

    @Expose()
    image: string

    @Expose()
    status: string

    @Expose()
    create_at: string

}