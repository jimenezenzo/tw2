import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosServiceService } from 'src/app/services/productos/productos-service.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  productos?: Producto[];

  constructor(private _productoService:ProductosServiceService) { }

  ngOnInit(): void {
    this.productos = this._productoService.getAllProducts();
    console.log(this.productos)
  }

}
