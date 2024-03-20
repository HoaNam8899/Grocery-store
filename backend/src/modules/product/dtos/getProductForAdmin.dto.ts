import { Expose } from "class-transformer";
import { CategoryEntity } from "src/modules/category/database/category.entity";
import { CategoryDtoForReturn } from "src/modules/category/dtos/returnCategory.dto";

export class ProductDtoForAdmin {
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
    create_at: string

    @Expose()
    update_at: string

    @Expose()
    status: boolean

}