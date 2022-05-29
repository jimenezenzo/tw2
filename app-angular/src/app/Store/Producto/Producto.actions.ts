import { ProductoStateModel } from "./Producto.model";

export class AddProducto {
    static readonly type = '[PRODUCTOS] Add';
    constructor( public producto: ProductoStateModel ) {}
}

export class RemoveProducto {
    static readonly type = '[PRODUCTOS] Remove';
    constructor( public id: string ) {}
}

export class UpdateCantidad {
    static readonly type = '[PRODUCTOS] Update cantidad';
    constructor( public id: string, public cant: number ) {}
}