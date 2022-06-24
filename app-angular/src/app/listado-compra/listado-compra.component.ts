import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ItemProducto } from '../models/ItemProducto';
import {CambiarEstadoCarrito, RemoveProducto} from '../Store/Carrito/Carrito.actions'

@Component({
  selector: 'app-listado-compra',
  templateUrl: './listado-compra.component.html',
  styleUrls: ['./listado-compra.component.css']
})
export class ListadoCompraComponent implements OnInit {

  carrito: Observable<ItemProducto[]>;

  constructor(private store: Store) {
    this.carrito = this.store.select(state => state.carrito.productos)
  }

  ngOnInit(): void {
    this.store.dispatch(new CambiarEstadoCarrito(false))
  }

  public removeProducto(id: string) {
    this.store.dispatch(new RemoveProducto(id));
  }

}
