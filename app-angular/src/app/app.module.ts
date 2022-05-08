import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './Inicio/inicio.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegistrarComponent } from './Auth/registrar/registrar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    InicioComponent,
    LoginComponent,
    RegistrarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [InicioComponent]
})
export class AppModule { }
