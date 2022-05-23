import { Injectable } from '@angular/core';
import { Producto } from "../../models/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {

  constructor() {
    console.log("service funcando")
  }

  getAllProducts(){
    let listaProducto: Producto[] = [
      {
      id: 0,
      nombre: 'Samsung Galaxy S21',
      clasificacion: 'CELULAR',
      precio: 120000
      },
      {
        id: 1,
        nombre: 'Iphone 11 Pro Max',
        clasificacion: 'CELULAR',
        precio: 120000
      }
    ];


    return listaProducto;
  }

}
