import { Generated, JoinTable, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany } from 'typeorm';
// import { v4 as uuid } from 'uuid';
// const newUuid: string = uuid();
import { CategoryEntity } from 'src/modules/category/database/category.entity';
import { OrderEntity } from 'src/modules/order/database/order.entity';
import { OrderProductEntity } from 'src/modules/order/database/orderProduct.entity';
@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    product_id: number;

    @Column()
    @Generated("uuid")
    sku: string;

    @Column()
    product_name: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column()
    unit_price: number

    @Column()
    stock_quantity: number

    @Column({
        nullable: true
    })
    image: string;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column({ default: true })
    status: boolean;

    @ManyToOne(() => CategoryEntity, (category) => category.products, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({ name: "category_id" })
    category: CategoryEntity


    @OneToMany(() => OrderProductEntity, orderProduct => orderProduct.product, { cascade: true, eager: true })
    public orderProducts: OrderProductEntity[];
    // @ManyToMany(() => OrderEntity, (order) => order.products)
    // orders: OrderEntity[]
}