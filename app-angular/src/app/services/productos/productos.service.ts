import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from "../../models/producto";
import {Filtros} from "../../models/Filtro"
import { Observable } from 'rxjs';
import { ItemProducto } from 'src/app/models/ItemProducto';
import { Store } from '@ngxs/store';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  carrito: Observable<ItemProducto[]>;

  constructor(private httpCliente: HttpClient, private store: Store) {
    this.carrito = this.store.select(state => state.carrito.productos)
  }

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

  realizarPago(){
    let productos;
    
    this.carrito.subscribe(p => {
      productos = p.map(p => ({
        title: p.producto.nombre,
        description: p.producto.nombre,
        category_id: p.producto.categoria,
        quantity: p.cantidad,
        unit_price: p.producto.precio
      }));
    })

    return this.httpCliente.post<any>('http://localhost:4000/api/payment', {items: productos})
  }
}
