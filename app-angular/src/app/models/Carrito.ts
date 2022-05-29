import { ItemProducto } from "./ItemProducto";

export interface CarritoStateModel {
    productos: ItemProducto[],
    total: number
};