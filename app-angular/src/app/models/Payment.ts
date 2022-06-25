interface Payment{
    id: string,
    init_point: string,
    items: {title: string, category_id: string, quantity: number, unit_price: number}
}