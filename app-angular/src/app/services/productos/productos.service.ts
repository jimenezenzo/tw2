import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from "../../models/producto";
import {Filtros} from "../../models/Filtro"

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private httpCliente: HttpClient) {}

  getAllProducts(){
    return this.httpCliente.get<Producto[]>('http://localhost:4000/api/productos')
  }

  getProductosFiltrados(filtros: Filtros){
    let filtrosParaEnviar: Map<string, any> = new Map()

    for (const propFiltro in filtros) {
      filtros[propFiltro] != 'Todos' ?
        filtrosParaEnviar.set(propFiltro.toLowerCase(), filtros[propFiltro])
      : null
    }

    return this.httpCliente.post<Producto[]>(
    'http://localhost:4000/api/buscar-productos',
        Object.fromEntries(filtrosParaEnviar)
      )
  }
}
