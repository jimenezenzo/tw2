import {Component, OnInit} from '@angular/core'
import {NgForm} from "@angular/forms"
import {environment} from "../../../environments/environment"
import {CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js"
import {AuthService} from "../../services/auth/auth.service"

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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  registrarse(formulario: NgForm) {
    if (formulario.valid) {
      this.cargando = true
      this.mostrarError = false
      this.mostrarCreacion = false
      this.cargando = false
      this.authService.crearUsuario(this.nombre, this.email, this.direccion, this.password).subscribe(
        resolved => {
          this.email = ''
          this.nombre = ''
          this.password = ''
          this.mostrarCreacion = true
        },
        rejected => {
          this.mostrarError = true
          this.error = rejected.error
        }
      )
    }
  }

}
