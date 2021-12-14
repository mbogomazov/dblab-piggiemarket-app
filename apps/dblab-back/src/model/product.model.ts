import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Deal } from "./deal.model";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image_link: string;

    @Column()
    available_amount: number;

    @Column()
    price: number;

    @OneToMany(() => Deal, deal => deal.deal_number, {onDelete: 'CASCADE'})
    deals: Deal[]
}