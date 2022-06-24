import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { NgForm } from '@angular/forms';
import { empty } from 'rxjs';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  detallesProducto: Producto = {
    _id : "0",
    nombre : "",
    categoria: "",
    precio : 0,
    descripcion: "",
    almacenamiento: "",
    color: "",
    stock: 0,
    imagen: "",
    bateria: ""

  }; 
  cargando: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  crearProducto (formulario : NgForm){
    
  }
}
