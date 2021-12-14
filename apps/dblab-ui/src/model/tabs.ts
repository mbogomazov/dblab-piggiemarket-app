import { CustomerDto, DealDto, DeliveryDto, ProductDto } from '@dblab/dto';
import customerDisplayedColumns from "./columns/customer.column.model";
import dealDisplayedColumns from "./columns/deal.column.model";
import deliveryDisplayedColumns from "./columns/delivery.column.model";
import productDisplayedColumns from "./columns/product.column.model";


const customers: CustomerDto[] = [];
const deals: DealDto[] = [];
const deliveries: DeliveryDto[]  = [];
const products: ProductDto[] = [];

const tabs = [
    {
      dataSet: customers,
      tableName: 'Customer',
      title: 'Покупатели',
      displayedColumns: customerDisplayedColumns,
      primaryKeyColName: customerDisplayedColumns[0].name
    },
    {
      dataSet: deals,
      title: 'Заказы',
      tableName: 'Deal',
      displayedColumns: dealDisplayedColumns,
      primaryKeyColName: dealDisplayedColumns[0].name
    },
    {
      dataSet: deliveries,
      title: 'Доставка',
      tableName: 'Delivery',
      displayedColumns: deliveryDisplayedColumns,
      primaryKeyColName: deliveryDisplayedColumns[0].name
    },
    {
      dataSet: products,
      title: 'Продукты',
      tableName: 'Product',
      displayedColumns: productDisplayedColumns,
      primaryKeyColName: productDisplayedColumns[0].name
    },
]

export default tabs;