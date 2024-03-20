import { Expose } from "class-transformer";
import { OrderEntity } from "src/modules/order/database/order.entity";

export class UserOrderReturnDto {
    @Expose()
    user_id: string

    @Expose()
    orders: OrderEntity[]
}