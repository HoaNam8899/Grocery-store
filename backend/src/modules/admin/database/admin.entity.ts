import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    admin: string;

    @Column()
    password: string;

}