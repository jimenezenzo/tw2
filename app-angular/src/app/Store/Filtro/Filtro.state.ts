import {Action, Selector, State, StateContext} from '@ngxs/store'
import {Injectable} from '@angular/core'
import {
  Almacenamiento,
  Bateria,
  Color,
  Filtros,
  FiltroStateModel,
  FiltroYValor,
  Marca,
  Memoria
} from "../../models/Filtro"
import {EditarFiltro, ResetFiltro} from "./Filtro.actions"

export const filtroDefault = new Filtros(
  Color.TODOS,
  Marca.TODOS,
  Bateria.TODOS,
  Almacenamiento.TODOS,
  Memoria.TODOS
)

@State({
    name: 'filtros',
    defaults: {
      filtros: filtroDefault
    }
  })
@Injectable()
export class FiltroState {

    @Selector()
    static getFiltros(state: FiltroStateModel) {
        return state.filtros
    }

    @Action(EditarFiltro)
    editarFiltro(ctx: StateContext<FiltroStateModel>, { filtroNuevo }: EditarFiltro) {
      const state = ctx.getState();
      const filtros = Object.assign({}, state.filtros);
      console.log(filtroNuevo)

      switch (filtroNuevo.filtro) {
        case 'Bateria':
          filtros.bateria = filtroNuevo.valor as Bateria
          break
        case 'Color':
          filtros.color = filtroNuevo.valor as Color
          break
        case 'Memoria':
          filtros.memoria = filtroNuevo.valor as Memoria
          break
        case 'Almacenamiento':
          filtros.almacenamiento = filtroNuevo.valor as Almacenamiento
          break
        case 'Marca':
          filtros.marca = filtroNuevo.valor as Marca
          break
        default:
          throw new Error("no reconozco filtro: " + filtroNuevo.filtro)
      }

      ctx.patchState({
          filtros: filtros
      })

    }

    @Action(ResetFiltro)
    resetearFiltro(ctx: StateContext<FiltroStateModel>) {
        ctx.patchState({
            filtros: filtroDefault
        });
    }
}
