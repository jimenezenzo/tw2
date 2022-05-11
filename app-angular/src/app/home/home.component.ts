import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddProducto } from '../Store/Producto/Producto.actions';
import { ProductoStateModel } from '../Store/Producto/Producto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  carrito: Observable<ProductoStateModel[]>;

  constructor(private store: Store) {
    this.carrito = this.store.select(state => state.carrito.productos)
  }

  ngOnInit(): void {
  }

  public addProducto(id: number, nombre: string, clasificacion: string, precio: number, cantidad: number){
    this.store.dispatch(new AddProducto({id, nombre, clasificacion, precio, cantidad}))
  }
}
