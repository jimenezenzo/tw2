import { Component, Input } from '@angular/core';
import { Producto } from '../models/producto';
import {AddProducto} from "../Store/Carrito/Carrito.actions"
import {Store} from "@ngxs/store"

@Component({
  selector: 'detalle-root',
  templateUrl: 'detalle.component.html',

})
export class DetalleComponent {

  @Input()
  producto: Producto | undefined = undefined;
  showModal = false;

  constructor() {
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }
}
