import { Component, Input } from '@angular/core';
import { Producto } from '../models/producto';



@Component({
  selector: 'detalle-root',
  templateUrl: 'detalle.component.html',

})
export class DetalleComponent {

  @Input()
  idProducto: any;

  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }
}