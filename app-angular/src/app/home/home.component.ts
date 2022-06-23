import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ItemProducto } from '../models/ItemProducto';
import { Producto } from '../models/producto';
import { ProductosService } from '../services/productos/productos.service';
import { AddProducto } from '../Store/Producto/Producto.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carrito: Observable<ItemProducto[]>;
  productos:Producto[];
  productosCarrito: Producto[] = [];
  productoSelect: Producto;
  slider:any;
  defaultTransform:any;

  

  constructor(private store: Store, private _productoService:ProductosService) {
    this.carrito = this.store.select(state => state.carrito.productos);
    this.productos = [];
    this.productoSelect = this.productos[0]
  }

  ngOnInit(): void {
    this.slider = document.getElementById("slider");
    this.defaultTransform=0;

    this._productoService.getAllProducts().subscribe(data => {
      this.productos = data;
      this.productoSelect = data[0]
      this.productosCarrito = this.randomsArray(data);

      console.log(this.productosCarrito)
    });
  }

    


  public addProducto(producto: Producto, cantidad: number){
    this.store.dispatch(new AddProducto({producto, cantidad}))
  }

  goNext() {
    this.defaultTransform = this.defaultTransform - 398;
    if (Math.abs(this.defaultTransform) >= this.slider.scrollWidth / 1.7) this.defaultTransform = 0;
    this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
  }

   goPrev() {
    if (Math.abs(this.defaultTransform) === 0) this.defaultTransform = 0;
    else this.defaultTransform = this.defaultTransform + 398;
    this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
  }

  randomsArray(lista: Producto[]): any {
    return [...lista]
                .sort(() => Math.random() > 0.5 ? 1 : -1)
                .slice(0,6)
  }
  
 
}



