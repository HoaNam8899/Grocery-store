import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './database/order.entity';
import { User } from '../user/database/user.entity';
import { ProductEntity } from '../product/database/product.entity';
import { OrderProductEntity } from './database/orderProduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, User, ProductEntity, OrderProductEntity])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
