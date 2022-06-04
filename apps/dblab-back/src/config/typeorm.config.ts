import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Customer } from '../model/customer.model';
import { Deal } from '../model/deal.model';
import { Delivery } from '../model/delivery.model';
import { Product } from '../model/product.model';
import { config } from 'dotenv';
if (!process.env.PROD) {
  config({ path: './apps/dblab-back/src/config/.env' });
}

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Customer, Deal, Product, Delivery],
  synchronize: true,
};

export default typeOrmConfig;
