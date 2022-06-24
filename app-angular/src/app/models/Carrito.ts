import { ItemProducto } from "./ItemProducto";

export interface CarritoStateModel {
    productos: ItemProducto[],
    carritoAbierto: boolean,
    total: number
};
