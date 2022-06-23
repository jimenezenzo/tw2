import {Component, OnInit} from '@angular/core'
import {Store} from '@ngxs/store'
import {Observable, of} from 'rxjs'
import {environment} from "../../environments/environment"
import {CognitoUserAttribute, CognitoUserPool, CognitoUserSession} from "amazon-cognito-identity-js"
import {Router} from "@angular/router"
import {LogoutUsuario, LoguearUsuario} from "../Store/Auth/Auth.actions"
import {AuthService} from "../services/auth/auth.service"
import {MostrarTodos} from "../Store/Producto/Producto.actions"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartOpen = false
  isOpen = false
  cantidadCarrito: number = 0
  poolData = {
    UserPoolId: environment.cognitoUserPoolId,
    ClientId: environment.cognitoAppClientId
  }

  nombre: Observable<string> = new Observable<string>()
  logueado: Observable<boolean> = new Observable<boolean>(subscriber => subscriber.next(false))

  constructor(private store: Store, private router: Router, private authService: AuthService) {
    store.dispatch(new MostrarTodos())
    this.store.select(state => state.carrito.productos).subscribe(p => {
      this.cantidadCarrito = p.length
    })
    this.store.subscribe(state => {
      this.nombre = new Observable<string>(subscriber => subscriber.next(state.auth.usuario?.nombre ?? ''))
      this.logueado = new Observable<boolean>(subscriber => subscriber.next(state.auth.usuario?.logueado ?? false))
    })
  }

  ngOnInit(): void {
    if (this.authService.estaLogueado()) {
      this.authService.getUsuarioActual().subscribe( valor =>
        this.store.dispatch(new LoguearUsuario(valor[0], valor[1]))
      )
    }
  }

  logout() {
    var userPool = new CognitoUserPool(this.poolData)
    var usuarioActual = userPool.getCurrentUser()
    usuarioActual?.signOut()
    this.store.dispatch(new LogoutUsuario())
    this.router.navigate(['/'])
  }
}
