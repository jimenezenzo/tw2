import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddProducto, RemoveProducto, UpdateCantidad } from './Carrito.actions';
import { CarritoStateModel } from '../../models/Carrito'

@State({
    name: 'carrito',
    defaults: {
      productos: []
    }
  })
@Injectable()
export class CarritoState {
    // Obtiene todos los productos del estado
    @Selector()
    static getProductos(state: CarritoStateModel) {
        return state.productos
    }

    // Añade un nuevo producto al estado
    @Action(AddProducto)
    addProducto(ctx: StateContext<CarritoStateModel>,  {itemProducto}: AddProducto) {
      const state = ctx.getState();
      const productos = state.productos;

      if(productos.some(p => p.producto._id == itemProducto.producto._id)){
        this.updateCantidad(ctx, new UpdateCantidad(itemProducto.producto._id, itemProducto.cantidad))
      }
      else{
        ctx.patchState({
            productos: [...productos, itemProducto]
        })
      }
    }

    // Elimina un producto del estado
    @Action(RemoveProducto)
    removeProducto(ctx: StateContext<CarritoStateModel>, {id}: RemoveProducto) {
        const state = ctx.getState();

        ctx.patchState({
            productos: state.productos.filter(p => p.producto._id !== id)
        });
    }

    // Actualizar la cantidad de un producto del estado
    @Action(UpdateCantidad)
    updateCantidad(ctx: StateContext<CarritoStateModel>, {id, cant}: UpdateCantidad) {
        const state = ctx.getState();

        ctx.patchState({
            productos: state.productos.map( p => {
                if((p.producto._id == id) && !(p.cantidad + cant < 1)) p = { ...p, cantidad: p.cantidad + cant }
                return p
            })
        });
    }
}
