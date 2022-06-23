import {Component, OnInit} from '@angular/core'
import {NgForm} from "@angular/forms"
import {environment} from "../../../environments/environment"
import {CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js"

enum ErroresCreacionUsuarios {
  InvalidPasswordException = ('InvalidPasswordException'),
  InvalidParameterException = ('InvalidParameterException'),
  UsernameExistsException = ('UsernameExistsException')
}

interface IForm {
  name: string
  email: string
  [key: string]: string
}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  cargando: boolean = false
  nombre: string = ''
  email: string = ''
  password: string = ''
  direccion: string = ''

  mostrarCreacion: boolean = false
  mostrarError: boolean = false
  error: string = ''

  constructor() {
  }

  ngOnInit(): void {
  }

  registrarse(formulario: NgForm) {
    if (formulario.valid) {
      this.cargando = true
      var poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId // Your client id here
      }
      var userPool = new CognitoUserPool(poolData)
      var listaDeAtributos = []
      let datosDelForm: IForm = {
        "name": this.nombre,
        "email": this.email,
        "address": this.direccion
      }

      for (let key in datosDelForm) {
        let attrData = {
          Name: key,
          Value: datosDelForm[key]
        }
        let atributo = new CognitoUserAttribute(attrData)
        listaDeAtributos.push(atributo)
      }
      userPool.signUp(this.email, this.password, listaDeAtributos, [], (
        err,
        result
      ) => {
        this.mostrarError = false
        this.mostrarCreacion = false
        this.cargando = false
        if (err) {
          this.mostrarError = true
          if (err.name === ErroresCreacionUsuarios.InvalidPasswordException.toString()) {
            this.error = 'El password debe tener al menos 8 caracteres, 1 caracter especial y una mayuscula.'
          }
          else if (err.name === ErroresCreacionUsuarios.InvalidParameterException.toString()) {
            this.error = 'Se ingreso un email invalido o falto completar algun dato en el formulario.'
          } else if (err.name === ErroresCreacionUsuarios.UsernameExistsException.toString()) {
            this.error = 'Ya existe un usuario registrado con ese Email'
          } else {
            this.error = err.message || JSON.stringify(err)
          }
          console.log(err.name)
          return
        }
        this.email = ''
        this.nombre = ''
        this.password = ''
        this.mostrarCreacion = true
      })
    }
  }

}
