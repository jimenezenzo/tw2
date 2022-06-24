import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ItemProducto } from '../models/ItemProducto';
import { ProductosService } from '../services/productos/productos.service';
import { RemoveProducto } from '../Store/Carrito/Carrito.actions';

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
  }

  public removeProducto(id: string) {
    this.store.dispatch(new RemoveProducto(id));
  }

  public realizarPago(){
    let linkPago = '';

    this.carrito.subscribe(p => {
      const productos = p.map(p => ({
        title: p.producto.nombre, 
        category_id: p.producto.categoria,
        quantity: p.cantidad,
        unit_price: p.producto.precio
      }));

      this._productoService.realizarPago(productos)
        .subscribe(res => {
          console.log(res)
        })
    })
  }
}
