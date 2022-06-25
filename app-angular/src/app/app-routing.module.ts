import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Auth/login/login.component';
import { RegistrarComponent } from './Auth/registrar/registrar.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import {ConfirmarCuentaComponent} from "./Auth/confirmar-cuenta/confirmarCuenta.component"
import {LoginGuard} from "./guards/login.guard"
import { ListadoCompraComponent } from './listado-compra/listado-compra.component'
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { EstadoCompraComponent } from './estado-compra/estado-compra.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'registrarme', component: RegistrarComponent, canActivate: [LoginGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'recuperar-password', component: ResetPasswordComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'confirmar-cuenta', component: ConfirmarCuentaComponent},
  { path: 'listado-compra', component: ListadoCompraComponent, canActivate: [AuthGuardGuard]},
  {path: 'estado-compra', component: EstadoCompraComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
