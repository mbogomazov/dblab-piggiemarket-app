import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.model';
import { Delivery } from './delivery.model';
import { Product } from './product.model';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  deal_number: number;

  @Column()
  order_date: string;

  @Column()
  delivery_date: string;

  @Column()
  delivery_time: string;

  @ManyToOne(() => Customer, (customer) => customer.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Product, (product) => product.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  amount: number;

  @ManyToOne(() => Delivery, (delivery) => delivery.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;

  @Column()
  price: number;

  @BeforeInsert()
  calculateTotalPrice() {
    this.price = this.product.price * this.amount + this.delivery.price;
  }
}
