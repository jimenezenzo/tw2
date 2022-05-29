import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductoStateModel} from '../Store/Producto/Producto.model';
import { AddProducto, RemoveProducto, UpdateCantidad } from '../Store/Producto/Producto.actions';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: Observable<ProductoStateModel[]>;

  constructor(private store: Store) {
    this.carrito = this.store.select(state => state.carrito.productos)
  }

  ngOnInit(): void {}

  public removeProducto(id: string) {
    this.store.dispatch(new RemoveProducto(id));
  }

  public updateCantidad(id: string, cant: number){
    this.store.dispatch(new UpdateCantidad(id, cant));
  }
}
