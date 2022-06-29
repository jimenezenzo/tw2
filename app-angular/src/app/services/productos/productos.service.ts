import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from "../../models/producto";
import {Filtros} from "../../models/Filtro"
import { Observable } from 'rxjs';
import { ItemProducto } from 'src/app/models/ItemProducto';
import { Select, Store } from '@ngxs/store';
import { Payment } from 'src/app/models/Payment';
import { CarritoState } from 'src/app/Store/Carrito/Carrito.state';
import { AuthState } from 'src/app/Store/Auth/Auth.state';
import { IUsuario } from 'src/app/models/Auth';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  @Select(CarritoState.getProductos)
  carrito!: Observable<ItemProducto[]>;

  @Select(AuthState.getUsuario)
  user!: Observable<IUsuario>

  constructor(private httpCliente: HttpClient, private store: Store) {}

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
    let productos, emailAuth, nombreAuth;
    
    this.carrito.subscribe(p => {
      productos = p.map(p => ({
        title: p.producto.nombre,
        description: p.producto.nombre,
        category_id: p.producto.categoria,
        quantity: p.cantidad,
        unit_price: p.producto.precio
      }));
    })

    this.user.subscribe(u => {
      emailAuth = u.email,
      nombreAuth = u.nombre
    })

    return this.httpCliente.post<Payment>('http://localhost:4000/api/payment', {items: productos, email: emailAuth, nombre: nombreAuth})
  }

  createProduct(producto: FormData){
      return this.httpCliente.post<Producto>('http://localhost:4000/api/crear-producto', producto)
  }
}
