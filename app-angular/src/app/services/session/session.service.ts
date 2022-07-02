import {Injectable} from '@angular/core'
import {IUserToken} from "../auth/auth.service"

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() {
  }

  public getTokens() {
    return {
      accessTokenCognito: localStorage.getItem('accessTokenCognito'),
      refreshToken: localStorage.getItem('refreshTokenCognito')
    }
  }

  public eliminarTokens() {
    localStorage.removeItem('accessTokenCognito')
    localStorage.removeItem('refreshTokenCognito')
  }

  public setTokens(tokens: IUserToken) {
    localStorage.setItem('accessTokenCognito', tokens.accessToken)
    localStorage.setItem('refreshTokenCognito', tokens.refreshToken)
  }
}
