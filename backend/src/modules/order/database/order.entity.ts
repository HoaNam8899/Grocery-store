
import { OneToMany, JoinTable, Generated, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

import { User } from 'src/modules/user/database/user.entity';
import { OrderProductEntity } from './orderProduct.entity';

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn()
    order_id: number;

    @Column()
    @Generated("uuid")
    serial_number: string;

    @Column()
    total_price: number;

    @Column({
        nullable: true
    })
    note: string

    @Column({
        default: 1
    })
    status: number

    @Column()
    receive_name: string

    @Column()
    receive_address: string

    @Column()
    receive_phone: string

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    // order quan he nhieu mot user
    @ManyToOne(() => User, (user) => user.orders, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({ name: "user_id" })
    user: User

    @OneToMany(() => OrderProductEntity, orderProduct => orderProduct.order, { cascade: true, eager: true })
    public orderProducts: OrderProductEntity[];
}