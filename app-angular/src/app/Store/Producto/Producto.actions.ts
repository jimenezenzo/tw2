import { ProductoInterface } from "./Producto.model";

export class AddProducto {
    static readonly type = '[PRODCUTOS] Add';
    constructor( public producto: ProductoInterface ) {}
}

export class RemoveProducto {
    static readonly type = '[PRODCUTOS] Remove';
    constructor( public id: number ) {}
}