import { Injectable } from '@nestjs/common';
import { OrderEntity } from './database/order.entity';
import { User } from '../user/database/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { ProductEntity } from '../product/database/product.entity';
import { OrderProductEntity } from './database/orderProduct.entity';
import { updateStatusDto } from './dtos/updateStatus.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(OrderProductEntity) private readonly orderProductRepository: Repository<OrderProductEntity>
    ) { }

    async createOrder(body: CreateOrderDto): Promise<string> { //order da co 
        let result = await this.orderRepository.save(body);
        let user = await this.userRepository.find({
            relations: {
                orders: true,
            },
            where: {
                user_id: body.user_id,
            },
        })

        if (user) {
            user[0].orders.push(result);
            await this.userRepository.save(user);
        } else {
            return "0"
        }

        let order = await this.orderRepository.find({
            relations: {
                orderProducts: true,
            },
            where: {
                order_id: result.order_id,
            },
        })

        if (order.length != 0) {
            for (let item of body.productInfo) {
                let returnOrderProduct = await this.orderProductRepository.save(item);

                let product = await this.productRepository.find({
                    relations: {
                        orderProducts: true,
                    },
                    where: {
                        product_id: item.product_id,
                    },
                })
                product[0].orderProducts.push(returnOrderProduct);
                await this.productRepository.save(product[0])

                order[0].orderProducts.push(returnOrderProduct);
            }

            await this.orderRepository.save(order[0]);
            return "1"
        }
    }

    async getAllOrder() {
        let orders = await this.orderRepository.find({
            relations: {
                orderProducts: true,
            }
        })
        return orders;
    }


    async update(body: updateStatusDto) {
        await this.orderRepository.update({ order_id: body.order_id }, body);
        return 'update trạng thái thành công'
    }

    async getOneOrder(id: string) {
        const result = await this.orderRepository.find({
            relations: {
                orderProducts: true
            },
            where: {
                order_id: +id
            }
        })
        return result;
    }
}
