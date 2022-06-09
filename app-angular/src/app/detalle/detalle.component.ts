import { Component } from '@angular/core';
import { Producto } from '../models/producto';


@Component({
  selector: 'detalle-root',
  templateUrl: 'detalle.component.html',

})
export class DetalleComponent {
  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }
}