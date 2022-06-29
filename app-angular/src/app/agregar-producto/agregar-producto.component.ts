import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { NgForm } from '@angular/forms';
import { ProductosService } from '../services/productos/productos.service';
import { Router } from '@angular/router';


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
  cargando: boolean = false

  constructor(private _productoService: ProductosService, private router: Router) {}

  ngOnInit(): void {}

  cargarImagen(event: any){
    if(event.target.value){
      this.detallesProducto.imagen = event.target.files[0]
    }
  }

  crearProducto(formulario: NgForm) {
    if(this.detallesProducto.imagen){
      let fd = new FormData();
      fd.append('imagen', this.detallesProducto.imagen)
      fd.append('nombre', this.detallesProducto.nombre)
      fd.append('descripcion', this.detallesProducto.descripcion)
      fd.append('precio', String(this.detallesProducto.precio))
      fd.append('stock', String(this.detallesProducto.stock))
      fd.append('marca', this.detallesProducto.marca)
      fd.append('color', this.detallesProducto.color)
      fd.append('categoria', this.detallesProducto.categoria)
      fd.append('bateria', this.detallesProducto.bateria)
      fd.append('almacenamiento', this.detallesProducto.almacenamiento)

      this._productoService.createProduct(fd).subscribe( r => {
        this.router.navigate(['/'])
      });
    }
  }
}
