import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
// import { v4 as uuid } from 'uuid';
// const newUuid: string = uuid();
import { ProductEntity } from 'src/modules/product/database/product.entity';
@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column()
    category_name: string;

    @Column({
        nullable: true
    })
    description: string;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column({ default: true })
    status: boolean;

    @OneToMany(() => ProductEntity, (product) => product.category, { cascade: true, eager: true })
    products: ProductEntity[]
}