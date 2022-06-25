import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from 'src/environments/environment';
import { CarritoState } from './Store/Carrito/Carrito.state';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './Inicio/inicio.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegistrarComponent } from './Auth/registrar/registrar.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { ProductosService } from './services/productos/productos.service';
import {DetalleComponent} from "./detalle/detalle.component"
import {FiltroComponent} from "./filtro/filtro.component"
import {FiltroState} from "./Store/Filtro/Filtro.state"
import {FormsModule} from "@angular/forms"
import {ProductoState} from "./Store/Producto/Producto.state"
import {ProductosComponent} from "./productos/productos.component"
import {ConfirmarCuentaComponent} from "./Auth/confirmar-cuenta/confirmarCuenta.component"
import {AuthService} from "./services/auth/auth.service"
import {AuthState} from "./Store/Auth/Auth.state";
import { ListadoCompraComponent } from './listado-compra/listado-compra.component';


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
    DetalleComponent,
    ProductosComponent,
    FiltroComponent,
    ConfirmarCuentaComponent,
    ListadoCompraComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([
      CarritoState,
      FiltroState,
      ProductoState,
      AuthState
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
  providers: [
    ProductosService,
    AuthService,
  ],
  bootstrap: [InicioComponent]
})
export class AppModule { }
