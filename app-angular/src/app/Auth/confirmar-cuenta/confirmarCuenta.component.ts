import {Component, OnInit} from '@angular/core'
import {NgForm} from "@angular/forms"
import {AuthService} from "../../services/auth/auth.service"

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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  confirmarUsuario(formulario: NgForm) {
    if (!formulario.valid) return
    this.mostrarError = false

    this.authService.confirmarCuenta(this.email, this.codigo).subscribe(
      resuelta => {
        this.mostrarConfirmacion = true
      },
      error => {
        this.error = error
      }
    )
  }
}
