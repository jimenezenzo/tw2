export interface Producto {
  _id: string;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  almacenamiento: string;
  color: string;
  stock: number;
  imagen: string;
  bateria: string;
  marca: string;
};

export interface ProductoStateModel {
  productos: Producto[]
}
