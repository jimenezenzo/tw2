import {Component, OnInit} from '@angular/core'
import {Store} from '@ngxs/store'
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

  cartOpen: boolean = false
  isOpen = false
  cantidadCarrito: number = 0

  nombre: string = ''
  logueado: false = false

  constructor(private store: Store, private router: Router, private authService: AuthService) {
    store.dispatch(new MostrarTodos())
    this.store.select(state => state.carrito.productos).subscribe(p => {
      this.cantidadCarrito = this.calcularCantidadDeProductos(p)
    })
    this.store.subscribe(state => {
      this.nombre = state.auth.usuario?.nombre
      this.logueado = state.auth.usuario?.logueado
    })
    this.store.subscribe(state => {
      this.cartOpen = state.carrito.carritoAbierto
    })
  }

  ngOnInit(): void {
    this.authService.estaLogueado().then((logueado => {
      if (logueado) {
        this.authService.getUsuarioActual().subscribe(
          (valor: any) => {
            this.store.dispatch(new LoguearUsuario(valor.nombre.Value, valor.email.Value))
          },
          (error) => {
            this.store.dispatch(new LogoutUsuario())
          })
      }
    }))
  }

  private calcularCantidadDeProductos = (productos: Array<{ producto: any, cantidad: number }>) => {
    return productos.reduce((contador, valorActual) => {
      return contador + valorActual.cantidad
    }, 0)
  }

  logout() {
    this.store.dispatch(new LogoutUsuario())
    this.router.navigate(['/'])
  }
}
