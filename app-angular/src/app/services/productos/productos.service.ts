import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from "../../models/producto";
import {Filtros} from "../../models/Filtro"
import { ItemProducto } from 'src/app/models/ItemProducto';
import { Observable } from 'rxjs/internal/Observable';

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
      if (filtros[propFiltro] !== 'Todos' && propFiltro !== 'busqueda') {
        filtrosParaEnviar.set(propFiltro.toLowerCase(), filtros[propFiltro])
      }
      if (propFiltro === 'busqueda' && filtros[propFiltro] !== '') {
        filtrosParaEnviar.set('descripcion', {
          $regex: `${filtros[propFiltro]}`, $options: 'i'
        })
      }
    }

    return this.httpCliente.post<Producto[]>(
    'http://localhost:4000/api/buscar-productos',
        Object.fromEntries(filtrosParaEnviar)
      )
  }

  realizarPago(items: {title: string, category_id: string, quantity: number, unit_price: number}[]){
    return this.httpCliente.post('http://localhost:4000/api/payment', {items: items})
  }
}
