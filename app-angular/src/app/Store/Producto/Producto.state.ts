import {Action, Selector, State, StateContext} from "@ngxs/store"
import {Injectable} from "@angular/core"
import {Producto, ProductoStateModel} from "../../models/producto"
import {FiltrarProductos, MostrarTodos} from "./Producto.actions"
import {ProductosService} from "../../services/productos/productos.service"

@State({
  name: 'productos',
  defaults: {
    productos: []
  }
})
@Injectable()
export class ProductoState {

  constructor(private _productoService: ProductosService) {
  }

  @Selector()
  static getProductos(state: ProductoStateModel) {
    return state.productos
  }

  @Action(FiltrarProductos)
  filtrarProductos(
    ctx: StateContext<ProductoStateModel>,
    {filtros}: FiltrarProductos
  ) {
    const state = ctx.getState()

    this._productoService.getProductosFiltrados(filtros).subscribe(productosFiltrados =>
      ctx.patchState({
        productos: productosFiltrados
      })
    )
  }

  @Action(MostrarTodos)
  mostrarTodos(ctx: StateContext<ProductoStateModel>) {
    const state = ctx.getState()
    let productos: Producto[] = state.productos

    this._productoService.getAllProducts().subscribe(productosFiltrados =>
      productos = [...productos, ...productosFiltrados]
    )

    ctx.patchState({
      productos: productos
    })
  }
}
