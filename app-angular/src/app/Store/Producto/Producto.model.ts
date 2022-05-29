export interface ProductoStateModel {
    id: string;
    nombre: string;
    categoria: string,
    precio: number,
    descripcion: string,
    almacenamiento: string,
    color: string,
    cantidad: number
};

export interface CarritoStateModel {
    productos: ProductoStateModel[]
};