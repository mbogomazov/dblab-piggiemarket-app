import DisplayedColumn from "./displayedcolumns.model";
const productDisplayedColumns: DisplayedColumn[]= [
    {
      name: 'id',
      title: 'Идентификатор'
    },
    {
      name: 'name',
      title: 'Продукт'
    },
    {
      name: 'image_link',
      title: 'Ссылка на изображение'
    },
    {
      name: 'available_amount',
      title: 'Доступное количество товара'
    },
    {
      name: 'price',
      title: 'Цена'
    }
]

export default productDisplayedColumns;