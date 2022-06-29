import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { NgForm } from '@angular/forms';
import { ProductosService } from '../services/productos/productos.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
})
export class AgregarProductoComponent implements OnInit {
  detallesProducto: Producto = {
    _id: '',
    nombre: '',
    categoria: '',
    precio: 0,
    descripcion: '',
    almacenamiento: '',
    color: '',
    stock: 0,
    imagen: '',
    bateria: '',
    marca: '',
  };
  cargando: boolean = false;

  constructor(private _productoService: ProductosService) {}

  ngOnInit(): void {}

  crearProducto(formulario: NgForm) {
    this._productoService.createProduct(formulario.value).subscribe();
  }
}
