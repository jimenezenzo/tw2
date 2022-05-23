import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Auth/login/login.component';
import { RegistrarComponent } from './Auth/registrar/registrar.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { CategoriasComponent } from './categorias/categorias/categorias.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'registrarme', component: RegistrarComponent},
  { path: 'login', component: LoginComponent},
  { path: 'recuperar-password', component: ResetPasswordComponent}
  { path: 'recuperar-password', component: ResetPasswordComponent},
  { path: 'categorias', component: CategoriasComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
