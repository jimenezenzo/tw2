export interface ProductoInterface {
    id: number;
    text: string;
};

export interface CarritoInterface {
    productos: ProductoInterface[]
};