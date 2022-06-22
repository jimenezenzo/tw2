interface IUsuario {
  nombre: string | null,
  email: string,
  logueado: boolean
}

export interface AuthStateModel {
    usuario: IUsuario,
}
