import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductoStateModel} from '../Store/Producto/Producto.model';
import { AddProducto, RemoveProducto, UpdateCantidad } from '../Store/Producto/Producto.actions';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  carrito: Observable<ProductoStateModel[]>;

  constructor(private store: Store) {
    this.carrito = this.store.select(state => state.carrito.productos)
  }

  ngOnInit(): void {}
}
