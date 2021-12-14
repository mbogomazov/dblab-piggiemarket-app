import { Customer } from "./customer.model";
import { Deal } from "./deal.model";
import { Delivery } from "./delivery.model";
import { Product } from "./product.model";

const tableEntities = {
    'Customer': Customer,
    'Deal': Deal,
    'Delivery': Delivery,
    'Product': Product
};
export default tableEntities;