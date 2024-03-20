
import { OrderEntity } from 'src/modules/order/database/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    username: string

    @Column()
    email: string;

    @Column()
    fullname: string

    @Column({
        default: true
    })
    status: boolean

    @Column()
    password: string;

    @Column()
    phone: string

    @Column()
    address: string

    @Column({
        default: 0
    })
    role: number;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @OneToMany(() => OrderEntity, (order) => order.user, { cascade: true, eager: true })
    orders: OrderEntity[]
}