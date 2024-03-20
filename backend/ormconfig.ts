import { AdminEntity } from "src/modules/admin/database/admin.entity";
import { CategoryEntity } from "src/modules/category/database/category.entity";
import { OrderEntity } from "src/modules/order/database/order.entity";
import { OrderProductEntity } from "src/modules/order/database/orderProduct.entity";
import { ProductEntity } from "src/modules/product/database/product.entity";
import { User } from "src/modules/user/database/user.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
require('dotenv').config();

export const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '12345678',
    database: process.env.DB_NAME || 'typeorm0218',
    entities: [User, ProductEntity, CategoryEntity, OrderEntity, OrderProductEntity, AdminEntity],// thêm entity vào thì mới tạo được
    synchronize: true,// true thì sẽ tự động tạo bảng
    namingStrategy: new SnakeNamingStrategy()
}