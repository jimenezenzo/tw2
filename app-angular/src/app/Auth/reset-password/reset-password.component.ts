import {Component, OnInit} from '@angular/core'
import {NgForm} from "@angular/forms"
import {environment} from "../../../environments/environment"
import {CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js"

enum ErrorResetPassword {
  InvalidPasswordException = ('InvalidPasswordException'),
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  cargando: boolean = false
  email: string = ''
  mostrarIngresarCodigo: boolean = false
  mostrarMensajeCodigoEnviado: boolean = false
  codigo: string = ''
  password: string = ''
  mostrarCambioDeContrasenia: boolean = false

  error: string = ''
  mostrarError: boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

  recuperarContrasenia(formulario: NgForm) {
    if (!formulario.valid) return
    this.cargando = true
    this.mostrarError = false
    this.mostrarMensajeCodigoEnviado = false
    this.mostrarCambioDeContrasenia = false

    let poolData = {
      UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
      ClientId: environment.cognitoAppClientId // Your client id here
    }

    let userPool = new CognitoUserPool(poolData)
    let userData = {Username: this.email, Pool: userPool}
    var cognitoUser = new CognitoUser(userData)
    if (this.mostrarIngresarCodigo) {
      cognitoUser.confirmPassword(this.codigo, this.password, {
        onSuccess: () => {
          this.mostrarCambioDeContrasenia = true
          this.cargando = false
        },
        onFailure: (err) => {
          this.mostrarError = true
          if (err.name == ErrorResetPassword.InvalidPasswordException.toString()) {
            this.error = 'El password debe tener al menos 8 caracteres, 1 caracter especial y una mayuscula.'
          } else {
            this.error = 'El codigo no es el correcto'
          }
          this.cargando = false
        },
      })
    } else {
      cognitoUser.forgotPassword(
        {
          onFailure: (p1: Error) => {
            this.mostrarError = true
            this.error = 'No hay usuario registrado con ese Email'
            console.log(p1.name, p1.message, p1.stack)
            this.cargando = false
          },
          onSuccess: (p1: any) => {
            this.mostrarIngresarCodigo = true
            this.mostrarMensajeCodigoEnviado = true
            // successfully initiated reset password request
            console.log(p1)
            this.cargando = false
          }
        }
      )
    }
  }
}
