import {Component, OnInit} from '@angular/core'
import {NgForm} from "@angular/forms"
import {environment} from "../../../environments/environment"
import {CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute} from 'amazon-cognito-identity-js'
import {Router} from "@angular/router"
import {Store} from "@ngxs/store"
import {LoguearUsuario} from "../../Store/Auth/Auth.actions"
import {AuthService} from "../../services/auth/auth.service"

enum ErroresLogin {
  NotAuthorizedException = ('NotAuthorizedException'),
  UserNotConfirmedException = ('UserNotConfirmedException')
}

interface IForm {
  email: string

  [key: string]: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cargando: boolean = false

  email: string = ''
  password: string = ''

  mostrarError: boolean = false
  error: string = ''

  constructor(private router: Router, private store: Store, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  loguearse(form: NgForm) {
    if (form.valid) {
      this.mostrarError = false
      this.cargando = true
      let authenticationDetails = new AuthenticationDetails({
        Username: this.email,
        Password: this.password,
      })
      let poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId // Your client id here
      }

      let userPool = new CognitoUserPool(poolData)
      let userData = {Username: this.email, Pool: userPool}
      var cognitoUser = new CognitoUser(userData)
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.authService.getNombreUsuarioActual().subscribe(
            valor => {
              this.store.dispatch(new LoguearUsuario(valor))
              this.router.navigate(['/'])
            }
          )
        },
        onFailure: (err) => {
          this.mostrarError = true
          if (err.name === ErroresLogin.NotAuthorizedException.toString()) {
            this.error = "No existe usuario con ese email y contraseña."
          } else if (err.name === ErroresLogin.UserNotConfirmedException.toString()) {
            this.error = "El usuario aun no esta confirmado. Se le ha enviado un Email con el codigo de verificacion."
          } else {
            this.error = err.message || JSON.stringify(err)
          }
          console.log(err.name || JSON.stringify(err))
          this.cargando = false
        },
      })
    }
  }
}
