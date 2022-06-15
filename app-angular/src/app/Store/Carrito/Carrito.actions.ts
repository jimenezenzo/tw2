import { ItemProducto } from "src/app/models/ItemProducto";

export class AddProducto {
    static readonly type = '[PRODUCTOS] Add';
    constructor( public itemProducto: ItemProducto ) {}
}

export class RemoveProducto {
    static readonly type = '[PRODUCTOS] Remove';
    constructor( public id: string ) {}
}

export class UpdateCantidad {
    static readonly type = '[PRODUCTOS] Update cantidad';
    constructor( public id: string, public cant: number ) {}
}