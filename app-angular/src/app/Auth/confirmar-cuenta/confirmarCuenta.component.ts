import {Component, OnInit} from '@angular/core'
import {NgForm} from "@angular/forms"
import {environment} from "../../../environments/environment"
import {CognitoUser, CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js"

enum ErroresConfirmacion {
  CodeMismatchException = ('CodeMismatchException'),
}

interface IForm {
  name: string
  email: string

  [key: string]: string
}

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmarCuenta.component.html',
})
export class ConfirmarCuentaComponent implements OnInit {

  codigo: string = ''
  cargando: boolean = false
  email: string = ''
  password: string = ''

  mostrarConfirmacion: boolean = false
  mostrarError: boolean = false
  error: string = ''

  constructor() {
  }

  ngOnInit(): void {
  }

  confirmarUsuario(formulario: NgForm) {
    if (!formulario.valid) return
    this.mostrarError = false
    var poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    }

    var userPool = new CognitoUserPool(poolData)
    var userData = {
      Username: this.email,
      Pool: userPool,
    }

    var cognitoUser = new CognitoUser(userData)
    cognitoUser.confirmRegistration(this.codigo, true, (
      err,
      result
    ) => {
      if (err) {
        this.mostrarError = true
        if (err.name === ErroresConfirmacion.CodeMismatchException.toString()) {
          this.error = 'Codigo incorrecto'
        }
        console.log(err.name)
        console.log(err.message || JSON.stringify(err))
        return
      } else {
        this.mostrarConfirmacion = true
      }
    })
  }
}
