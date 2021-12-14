import { CustomerDto, DeliveryDto, ProductDto } from ".."

export interface DealDto {
    deal_number: number,
    order_date: string,
    delivery_date: string,
    delivery_time: string,
    customer?: CustomerDto,
    customer_id?: number,
    product?: ProductDto,
    product_id?: number,
    amount: number,
    delivery?: DeliveryDto,
    delivery_id?: number,
    price: number
}