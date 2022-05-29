import { ItemProducto } from "./ItemProducto";

export interface Factura {
    id: string,
    items: ItemProducto[],
    total: number
};