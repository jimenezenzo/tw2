import { ItemPayment } from "./ItemPayment";

export interface Payment{
    id: string,
    init_point: string,
    items: ItemPayment[]
}