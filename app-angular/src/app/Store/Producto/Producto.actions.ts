import {Filtros} from "../../models/Filtro"

export class FiltrarProductos {
    static readonly type = '[PRODUCTOS] Filtrar';
    constructor(public filtros: Filtros) {}
}

export class MostrarTodos {
    static readonly type = '[PRODUCTOS] MostrarTodos';
    constructor() {}
}
