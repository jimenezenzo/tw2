import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CarritoStateModel } from './Producto.model';
import { AddProducto, RemoveProducto, UpdateCantidad } from './Producto.actions';

@State({
    name: 'carrito',
    defaults: {
      productos: []
    }
  })
@Injectable()
export class ProductoState {
    // Obtiene todos los productos del estado
    @Selector()
    static getProductos(state: CarritoStateModel) {
        return state.productos
    }
  
    // Añade un nuevo producto al estado
    @Action(AddProducto)
    addProducto(ctx: StateContext<CarritoStateModel>,  {producto}: AddProducto) {
      const state = ctx.getState();
      const productos = state.productos;
        
      if(productos.some(p => p.id == producto.id)){
        this.updateCantidad(ctx, new UpdateCantidad(producto.id, producto.cantidad))
      }
      else{
        ctx.patchState({
            productos: [...state.productos, producto]
        })
      }
    }

    // Elimina un producto del estado
    @Action(RemoveProducto)
    removeProducto(ctx: StateContext<CarritoStateModel>, {id}: RemoveProducto) {
        const state = ctx.getState();

        ctx.patchState({
            productos: state.productos.filter(producto => producto.id !== id)
        });
    }

    // Actualizar la cantidad de un producto del estado
    @Action(UpdateCantidad)
    updateCantidad(ctx: StateContext<CarritoStateModel>, {id, cant}: UpdateCantidad) {
        const state = ctx.getState();

        ctx.patchState({
            productos: state.productos.map( p => {
                if((p.id == id) && !(p.cantidad + cant < 1)) p = { ...p, cantidad: p.cantidad + cant }
                return p
            })
        });
    }
}