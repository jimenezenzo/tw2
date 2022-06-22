import {Injectable} from '@angular/core'
import {CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js"
import {environment} from "../../../environments/environment"
import {from, Observable} from "rxjs"
import { AuthStateModel } from 'src/app/models/Auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  poolData = {
    UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
    ClientId: environment.cognitoAppClientId // Your client id here
  }

  constructor() {
  }

  estaLogueado(): boolean {
    var estaLogueado: boolean = false

    var userPool = new CognitoUserPool(this.poolData)
    var usuarioActual = userPool.getCurrentUser()

    if (usuarioActual != null) {
      usuarioActual.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err))
          return
        }
        estaLogueado = session.isValid()
      })
    }
    return estaLogueado
  }

  getNombreUsuarioActual(): Observable<string> {
    var userPool = new CognitoUserPool(this.poolData)
    var usuarioActual = userPool.getCurrentUser()

    var getNombre = () => {
      return new Promise((resolve, reject) => {
        if (usuarioActual != null) {
          usuarioActual.getSession((err: any, session: any) => {
            if (err) {
              console.log(err.message || JSON.stringify(err))
              reject('')
            }
            usuarioActual?.getUserAttributes((err: Error | undefined, result: CognitoUserAttribute[] | undefined) => {
              if (err) {
                console.log(err.message || JSON.stringify(err))
                reject('')
              }
              var atributosUsuario = result ?? []

              resolve(atributosUsuario.find(atributo => atributo.Name == 'name')?.Value ?? '')
            })
          })
        } else {
          reject('')
        }
      })
    }

    return from(getNombre() as Promise<string>)
  }

  // getUsuarioActual(): Observable<AuthStateModel> {
  //   var userPool = new CognitoUserPool(this.poolData)
  //   var usuarioActual = userPool.getCurrentUser()

  //   var getUser = () => {
  //     return new Promise((resolve, reject) => {
  //       if (usuarioActual != null) {
  //         usuarioActual.getSession((err: any, session: any) => {
  //           if (err) {
  //             console.log(err.message || JSON.stringify(err))
  //             reject('')
  //           }

  //           usuarioActual?.getUserAttributes((err: Error | undefined, result: CognitoUserAttribute[] | undefined) => {
  //             if (err) {
  //               console.log(err.message || JSON.stringify(err))
  //               reject('')
  //             }

  //             resolve(new AuthStateModel({usuario: {

  //             }}) ?? [])

  //             //resolve(atributosUsuario.find(atributo => atributo.Name == 'name')?.Value ?? '')
  //           })
  //         })

  //       } else {
  //         reject('')
  //       }
  //     })
  //   }

  //   return from(getUser() as Promise<AuthStateModel>)
  // }

  getToken(): string {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)?.endsWith('accessToken') && localStorage.key(i)?.includes(environment.cognitoAppClientId)) {
        return localStorage.getItem(localStorage.key(i) ?? '') ?? ''
      }
    }
    return ''
  }
}
