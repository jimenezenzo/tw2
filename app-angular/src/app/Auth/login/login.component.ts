import {Component, OnInit} from '@angular/core'
import {NgForm} from "@angular/forms"
import {Router} from "@angular/router"
import {Store} from "@ngxs/store"
import {LoguearUsuario} from "../../Store/Auth/Auth.actions"
import {AuthService} from "../../services/auth/auth.service"
import {SessionService} from "../../services/session/session.service"

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

  constructor(private router: Router, private store: Store, private authService: AuthService, private sessionService: SessionService) {
  }

  ngOnInit(): void {
  }

  loguearse(form: NgForm) {
    if (form.valid) {
      this.mostrarError = false
      this.cargando = true
      this.authService.loguearse(this.email, this.password).subscribe(
        res => {
          this.store.dispatch(new LoguearUsuario('Usuario', this.email))
          this.sessionService.setTokens(res)
          this.router.navigate(['/'])
        },
        err => {
          this.mostrarError = true
          this.error = err.error.message
          this.cargando = false
        },
        () => {
          this.mostrarError = true
        })
    }
  }
}
