import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductoState } from '../Store/Producto/Producto.state';
import { CarritoInterface, ProductoInterface} from '../Store/Producto/Producto.model';
import { RemoveProducto } from '../Store/Producto/Producto.actions';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  @Select(ProductoState.getProductos) carrito$?: Observable<ProductoInterface>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log('carrito', this.carrito$)
  }

  // public removeProducto(id: number) {
  //   this.store.dispatch(new RemoveProducto(id));
  // }

  // public addProducto(id: number, text: string){

  // }
}
