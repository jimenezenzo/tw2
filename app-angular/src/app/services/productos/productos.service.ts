import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from "../../models/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private httpCliente: HttpClient) {}

  getAllProducts(){
    return this.httpCliente.get<Producto[]>('http://localhost:4000/api/productos')
  }

}
