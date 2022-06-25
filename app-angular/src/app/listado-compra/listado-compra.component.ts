import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ItemProducto } from '../models/ItemProducto';
import { ProductosService } from '../services/productos/productos.service';
import {CambiarEstadoCarrito, RemoveProducto} from '../Store/Carrito/Carrito.actions'

@Component({
  selector: 'app-listado-compra',
  templateUrl: './listado-compra.component.html',
  styleUrls: ['./listado-compra.component.css']
})
export class ListadoCompraComponent implements OnInit {

  carrito: Observable<ItemProducto[]>;

  constructor(private _productoService: ProductosService, private store: Store) {
    this.carrito = this.store.select(state => state.carrito.productos)
  }

  ngOnInit(): void {
    this.store.dispatch(new CambiarEstadoCarrito(false))
  }

  public removeProducto(id: string) {
    this.store.dispatch(new RemoveProducto(id));
  }

  public realizarPago(){
    this._productoService.realizarPago().subscribe(data => {
      window.location.href = data.init_point
    })
  }
}
