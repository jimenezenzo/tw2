import {Component, OnInit} from '@angular/core'
import {Store} from '@ngxs/store'
import {Observable} from 'rxjs'
import {EditarFiltro, ResetFiltro} from "../Store/Filtro/Filtro.actions"
import {Almacenamiento, Bateria, Color, Filtros, Marca} from "../models/Filtro"
import {Producto} from "../models/producto"
import {ProductosService} from "../services/productos/productos.service"


@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  filtroAbierto: boolean = false
  filtros: Observable<Filtros>
  colorElegido = Color.TODOS
  productos: Producto[] = [];
  colores: Array<Color> = [
    Color.BLANCO,
    Color.NEGRO,
    Color.TODOS,
    Color.ROJO
  ]
  marcas: Array<Marca> = [
    Marca.TODOS,
    Marca.LG,
    Marca.APPLE,
    Marca.SAMSUNG,
    Marca.XIAOMI,
    Marca.MOTOROLA
  ]
  baterias: Array<Bateria> = [
    Bateria.TODOS,
    Bateria["3000 mah"],
    Bateria["3500 mah"],
    Bateria["4000 mah"],
    Bateria["4500 mah"],
    Bateria["5000 mah"]
  ]
  almacenamientos: Array<Almacenamiento> = [
    Almacenamiento.TODOS,
    Almacenamiento["1 TB"],
    Almacenamiento["32 GB"],
    Almacenamiento["64 GB"],
    Almacenamiento["128 GB"],
    Almacenamiento["256 GB"],
    Almacenamiento["512 GB"]
  ]

  constructor(private store: Store, private _productoService: ProductosService) {
    this.filtros = this.store.select(state => state.filtros.filtros)
    this.filtros.subscribe( filtro => console.log(filtro.color))
  }

  ngOnInit(): void {
    this._productoService.getAllProducts().subscribe(data => {
      this.productos = data;
    });
  }

  filtroColor = () => {
    return this.filtros.subscribe( filtros => this.colorElegido = filtros.color)
  }

  resetearFiltro = () => {
    this.store.dispatch(new ResetFiltro());
  }

  cambiarFiltro = (filtro: 'Bateria' | 'Memoria' | 'Almacenamiento' | 'Color' | 'Marca', valor: string) => {
    this.store.dispatch(
      new EditarFiltro({filtro: filtro, valor: valor})
    );
  }
}
