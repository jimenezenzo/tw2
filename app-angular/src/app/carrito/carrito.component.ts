import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ItemProducto } from '../models/ItemProducto';
import { RemoveProducto, UpdateCantidad } from '../Store/Carrito/Carrito.actions';
import { CarritoState } from '../Store/Carrito/Carrito.state';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  @Select(CarritoState.getProductos)
  carrito!: Observable<ItemProducto[]>;

  @Select(CarritoState.getTotal)
  carritoTotal!: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  public removeProducto(id: string) {
    this.store.dispatch(new RemoveProducto(id));
  }

  public updateCantidad(id: string, cant: number){
    this.store.dispatch(new UpdateCantidad(id, cant));
  }
}
