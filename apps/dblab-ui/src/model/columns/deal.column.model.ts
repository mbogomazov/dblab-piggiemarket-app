import DisplayedColumn from "./displayedcolumns.model";

const dealDisplayedColumns: DisplayedColumn[]= [
    {
      name: 'deal_number',
      title: 'Номер доставки'
    },
    {
      name: 'order_date',
      title: 'Дата заказа'
    },
    {
      name: 'delivery_date',
      title: 'Дата доставки'
    },
    {
      name: 'delivery_time',
      title: 'Время доставки'
    },
    {
      name: 'customer_id',
      title: 'ID Пользователя'
    },
    {
      name: 'product_id',
      title: 'ID продукта'
    },
    {
      name: 'amount',
      title: 'Количество'
    },
    {
      name: 'delivery_id',
      title: 'ID доставки'
    },
    {
      name: 'price',
      title: 'Стоимость'
    },
]

export default dealDisplayedColumns;
