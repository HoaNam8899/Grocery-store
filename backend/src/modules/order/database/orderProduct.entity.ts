
import { JoinTable, Generated, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

import { User } from 'src/modules/user/database/user.entity';
import { ProductEntity } from 'src/modules/product/database/product.entity';
import { OrderEntity } from './order.entity';

@Entity()
export class OrderProductEntity {
    @PrimaryGeneratedColumn()
    order_product_id: number;

    @Column()
    product_name: string;

    @Column()
    unit_price: number;

    @Column()
    order_quantity: number

    @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
    @JoinColumn({ name: "order_id" })
    public order: OrderEntity

    @ManyToOne(() => ProductEntity, (product) => product.orderProducts)
    @JoinColumn({ name: "product_id" })
    public product: ProductEntity


}