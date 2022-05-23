import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from 'src/environments/environment';
import { ProductoState } from './Store/Producto/Producto.state';
import { HttpClientModule } from '@angular/common/http';

import { InicioComponent } from './Inicio/inicio.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegistrarComponent } from './Auth/registrar/registrar.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { ProductosServiceService } from './services/productos/productos-service.service';
import { CategoriasComponent } from './categorias/categorias/categorias.component';
import {FiltroComponent} from "./filtro/filtro.component"

@NgModule({
  declarations: [
    InicioComponent,
    LoginComponent,
    RegistrarComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CarritoComponent,
    ResetPasswordComponent,
    CategoriasComponent
    FiltroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([
      ProductoState
    ],
      { developmentMode: !environment.production }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),
    HttpClientModule
  ],
  providers: [ProductosServiceService],
  bootstrap: [InicioComponent]
})
export class AppModule { }
