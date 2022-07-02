import {Component, OnInit} from '@angular/core'
import {NgForm} from "@angular/forms"
import {AuthService} from "../../services/auth/auth.service"

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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  recuperarContrasenia(formulario: NgForm) {
    if (!formulario.valid) return
    this.cargando = true
    this.mostrarError = false
    this.mostrarMensajeCodigoEnviado = false
    this.mostrarCambioDeContrasenia = false

    if (this.mostrarIngresarCodigo) {
      this.authService.confirmarContrasenia(this.email, this.codigo, this.password).subscribe(
        resp => {
          console.log(resp)
          this.mostrarCambioDeContrasenia = true
          this.cargando = false
        },
        error => {
          console.log(error)
          this.mostrarError = true
          this.error = error.error
          this.cargando = false
        }
      )
    } else {
      this.authService.recuperarContrasenia(this.email).subscribe(
        resp => {
          console.log(resp)
          this.mostrarIngresarCodigo = true
          this.mostrarMensajeCodigoEnviado = true
          this.cargando = false
        },
        error => {
          console.log(error)
          this.mostrarError = true
          this.error = 'No hay usuario registrado con ese Email'
          this.cargando = false
        }
      )
    }
  }
}
