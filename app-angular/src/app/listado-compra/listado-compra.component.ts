import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CarritoStateModel } from '../models/Carrito';
import { ItemProducto } from '../models/ItemProducto';
import { ProductosService } from '../services/productos/productos.service';
import {CambiarEstadoCarrito, RemoveProducto} from '../Store/Carrito/Carrito.actions'
import { CarritoState } from '../Store/Carrito/Carrito.state';

@Component({
  selector: 'app-listado-compra',
  templateUrl: './listado-compra.component.html',
  styleUrls: ['./listado-compra.component.css']
})
export class ListadoCompraComponent implements OnInit {

  @Select(CarritoState.getProductos)
  carrito!: Observable<ItemProducto[]>;

  @Select(CarritoState.getTotal)
  carritoTotal!: Observable<number>;

  constructor(private _productoService: ProductosService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new CambiarEstadoCarrito(false))
  }

  public removeProducto(id: string) {
    this.store.dispatch(new RemoveProducto(id));
  }

  public realizarPago(){
    this._productoService.realizarPago().subscribe(payment => {
      window.location.href = payment.init_point
    })
  }
}
