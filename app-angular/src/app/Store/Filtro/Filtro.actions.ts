import {FiltroYValor} from "../../models/Filtro"

export class EditarFiltro {
    static readonly type = '[FILTROS] Editar';
    constructor(public filtroNuevo: FiltroYValor) {}
}

export class ResetFiltro {
    static readonly type = '[FILTROS] Reset';
    constructor() {}
}
