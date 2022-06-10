import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos?: Producto[];
  filtroAbierto = true;

  constructor(private _productoService:ProductosService) { }

  ngOnInit(): void {
    this._productoService.getAllProducts().subscribe(data => {
      this.productos = data;
    });
  }

}
