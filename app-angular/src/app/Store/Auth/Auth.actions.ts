export class LoguearUsuario {
    static readonly type = '[USUARIO] Log';
    constructor(public nombre: string, public email: string) {}
}

export class LogoutUsuario {
    static readonly type = '[USUARIO] Logout';
    constructor() {}
}
