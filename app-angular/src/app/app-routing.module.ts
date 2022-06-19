import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Auth/login/login.component';
import { RegistrarComponent } from './Auth/registrar/registrar.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import {ConfirmarCuentaComponent} from "./Auth/confirmar-cuenta/confirmarCuenta.component"
import {LoginGuard} from "./guards/login.guard"

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'registrarme', component: RegistrarComponent, canActivate: [LoginGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'recuperar-password', component: ResetPasswordComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'confirmar-cuenta', component: ConfirmarCuentaComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
