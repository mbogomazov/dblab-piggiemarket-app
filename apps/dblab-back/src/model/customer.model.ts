import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Deal } from './deal.model';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => Deal, (deal) => deal.deal_number, { onDelete: 'CASCADE' })
  deals: Deal[];
}
