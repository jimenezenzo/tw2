import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import {debounceTime, Observable, of, Subject, Subscription} from "rxjs"
import {Store} from "@ngxs/store"

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos?: Observable<Producto[]>;
  filtroAbierto = true;
  busqueda: string = ''
  cambioDeValor: Subject<string> = new Subject<string>()
  busquedaSubscrita: Subscription = new Subscription()

  constructor(private _productoService: ProductosService, private store: Store) {
    store.subscribe( store => {
        console.log(store.productos.productos)
        this.productos = new Observable<Producto[]>(subscriber => subscriber.next(store.productos.productos))
      })
  }

  ngOnInit(): void {
    this.productos = this._productoService.getAllProducts()
  }

  ngAfterContentInit() {
    this.busquedaSubscrita = this.cambioDeValor
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.busqueda = value
        this.store.subscribe( state => {
          let filtrosActuales = {...state.filtros.filtros}
          filtrosActuales.busqueda = value
          this.productos = this._productoService.getProductosFiltrados(filtrosActuales)
        })
      });
  }

  buscar(busqueda: string) {
    this.cambioDeValor.next(busqueda)
  }
}
