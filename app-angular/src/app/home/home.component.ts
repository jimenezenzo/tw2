import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductosService } from '../services/productos/productos.service';
import { AddProducto } from '../Store/Producto/Producto.actions';
import { ProductoStateModel } from '../Store/Producto/Producto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  carrito: Observable<ProductoStateModel[]>;
  productos:Producto[];
  productoSelect: Producto;

  constructor(private store: Store, private _productoService:ProductosService) {
    this.carrito = this.store.select(state => state.carrito.productos);
    this.productos = [];
    this.productoSelect = this.productos[0]
  }

  ngOnInit(): void {
    this._productoService.getAllProducts().subscribe(data => {
      this.productos = data;
      this.productoSelect = data[0]
    });
  }

  public addProducto(producto: Producto){
    this.store.dispatch(new AddProducto(producto))
  }

  // public selectProducto(id: string){
  //   this.productoSelect = this.productos.find(p => p.id == id)
  // }
}
