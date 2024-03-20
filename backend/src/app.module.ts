import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { OrderModule } from './modules/order/order.module';
import { AdminModule } from './modules/admin/admin.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    AdminModule,

  ],
})
export class AppModule { }
