import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import {Observable, of} from "rxjs"
import {Store} from "@ngxs/store"

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos?: Observable<Producto[]>;
  filtroAbierto = true;

  constructor(private _productoService: ProductosService, private store: Store) {
    store.subscribe( store => {
      console.log(store.productos.productos)
      this.productos = new Observable<Producto[]>(subscriber => subscriber.next(store.productos.productos))
    })
}
  ngOnInit(): void {
    this.productos = this._productoService.getAllProducts()
  }
}
