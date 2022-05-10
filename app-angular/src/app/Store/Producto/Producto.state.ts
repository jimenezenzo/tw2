import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CarritoInterface, ProductoInterface } from './Producto.model';
import { AddProducto, RemoveProducto } from './Producto.actions';

@State({
    name: 'carrito',
    defaults: {
      productos: []
    }
  })
@Injectable()
export class ProductoState {

    @Selector()
    static getProductos(state: CarritoInterface) {
        return (type: ProductoInterface[]) => {
            return state.productos
        }
    }
  
    // Añade un nuevo prodcuto al estado
    @Action(AddProducto)
    AddProducto(ctx: StateContext<CarritoInterface>, action: AddProducto) {
      const state = ctx.getState();

      ctx.patchState({
        productos: [
            ...state.productos,
            action.producto
        ]
      });
    }

    // Elimina un producto del estado
    @Action(RemoveProducto)
    removeProducto(ctx: StateContext<CarritoInterface>, action: RemoveProducto) {
        const state = ctx.getState();

        ctx.patchState({
            productos: state.productos.filter(producto => producto.id !== action.id)
        });
    }
}