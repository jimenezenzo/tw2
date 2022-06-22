interface IUsuario {
  nombre: string | null,
  logueado: boolean
}

export interface AuthStateModel {
    usuario: IUsuario,
}
