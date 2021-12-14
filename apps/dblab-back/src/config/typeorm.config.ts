import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Customer } from '../model/customer.model';
import { Deal } from '../model/deal.model';
import { Delivery } from '../model/delivery.model';
import { Product } from '../model/product.model';


const typeOrmConfig: PostgresConnectionOptions =  {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'goblin',
    password: 'goblin',
    database: 'piggiemarket',
    entities: [
        Customer,
        Deal,
        Product,
        Delivery
    ],
    synchronize: true,
};

export default typeOrmConfig;