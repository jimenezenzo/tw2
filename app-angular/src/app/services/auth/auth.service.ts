import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {SessionService} from "../session/session.service"
import {Router} from "@angular/router"

export interface IUserToken {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpCliente: HttpClient, private sessionService: SessionService, private router: Router) {
  }

  loguearse(email: string, password: string) {
    return this.httpCliente.post<IUserToken>(
      'http://localhost:4000/api/login',
      {email: email, password: password}
    )
  }

  async estaLogueado(): Promise<boolean> {
    let sessionTokens = this.sessionService.getTokens()

    if (sessionTokens.accessTokenCognito === '' ||
      sessionTokens.refreshToken === '' ||
      sessionTokens.accessTokenCognito === null
    ) {
      return new Promise(res => res(false))
    }

    return new Promise(resolve => {
      this.httpCliente.get('http://localhost:4000/api/check-login').subscribe((next: any) => {
        resolve(next.logueado)
      })
    })
  }

  getUsuarioActual() {
    return this.httpCliente.get('http://localhost:4000/api/get-perfil')
  }

  recuperarContrasenia(email: string) {
    return this.httpCliente.post(
      'http://localhost:4000/api/recuperar-contrasenia',
      {email: email}
    )
  }

  confirmarContrasenia(email: string, codigo: string, password: string) {
    return this.httpCliente.post(
      'http://localhost:4000/api/confirmar-contrasenia',
      {email: email, codigo: codigo, password: password}
    )
  }

  confirmarCuenta(email: string, codigo: string) {
    return this.httpCliente.post(
      'http://localhost:4000/api/confirmar-cuenta',
      {email: email, codigo: codigo}
    )
  }

  crearUsuario(nombre: string, email: string, direccion: string, password: string) {
    return this.httpCliente.post(
      'http://localhost:4000/api/registrar-usuario',
      {nombre: nombre, email: email, direccion: direccion, password: password}
    )
  }
}
