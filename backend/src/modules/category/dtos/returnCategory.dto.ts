import { Expose, Type } from "class-transformer";
import { ProductDtoForReturn } from "src/modules/product/dtos/getProduct.dto";

export class CategoryDtoForReturn {
    @Expose()
    category_id: number

    @Expose()
    @Type(() => ProductDtoForReturn)
    products: ProductDtoForReturn[];
}