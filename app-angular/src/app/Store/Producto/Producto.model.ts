export interface ProductoStateModel {
    id: number;
    nombre: string;
    clasificacion: string,
    precio: number,
    cantidad: number
};

export interface CarritoStateModel {
    productos: ProductoStateModel[]
};