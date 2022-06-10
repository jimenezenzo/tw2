import {Component, OnInit} from '@angular/core'
import {Store} from '@ngxs/store'
import {Observable} from 'rxjs'
import {EditarFiltro, ResetFiltro} from "../Store/Filtro/Filtro.actions"
import {Bateria, Color, Filtros, FiltroYValor} from "../models/Filtro"
import {Producto} from "../models/producto"
import {ProductosService} from "../services/productos/productos.service"


@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  filtros: Observable<Filtros>
  productos: Producto[] = [];
  colores: Array<Color> = [
    Color.BLANCO,
    Color.NEGRO,
    Color.TODOS,
    Color.ROJO
  ]

  constructor(private store: Store, private _productoService:ProductosService) {
    this.filtros = this.store.select( state => state.filtrosSeleccionados)
  }

  ngOnInit(): void {
    this._productoService.getAllProducts().subscribe(data => {
      this.productos = data;
    });
  }

  resetearFiltro = () => {
    this.store.dispatch(new ResetFiltro());
  }

  cambiarFiltro = (filtro: 'Bateria' | 'Memoria' | 'Almacenamiento' | 'Color' | 'Marca', valor: string) => {
    console.log(filtro, valor)
    this.store.dispatch(
      new EditarFiltro({filtro: filtro, valor: valor})
    );
  }
}
