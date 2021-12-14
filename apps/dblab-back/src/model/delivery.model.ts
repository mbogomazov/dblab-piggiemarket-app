import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Deal } from "./deal.model";

@Entity()
export class Delivery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    delivery_type: string;

    @Column()
    delivery_days: number;

    @Column()
    price: number;

    @OneToMany(() => Deal, deal => deal.deal_number, {onDelete: 'CASCADE'})
    deals: Deal[]
}