import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {AuthStateModel} from "../../models/Auth"
import {LogoutUsuario, LoguearUsuario} from "./Auth.actions"

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
      usuario: {
        nombre: '',
        email: '',
        logueado: false
      }
    }
})
@Injectable()
export class AuthState {
    @Selector()
    static getUsuario(state: AuthStateModel) {
        return state.usuario
    }

    @Action(LoguearUsuario)
    loguearUsuario(ctx: StateContext<AuthStateModel>, {nombre, email}: LoguearUsuario) {
      ctx.patchState({
          usuario: {
            nombre: nombre,
            email: email,
            logueado: true
          }
      })
    }

    @Action(LogoutUsuario)
    removeProducto(ctx: StateContext<AuthStateModel>) {
        ctx.patchState({
            usuario: undefined
        });
    }
}
