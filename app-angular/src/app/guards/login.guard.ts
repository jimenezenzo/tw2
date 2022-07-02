import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth/auth.service"

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      this.authService.estaLogueado().then((logueado) => {
          if (logueado) {
            this.router.navigate(['/'])
          }
          resolve(!logueado)
        })
    })
  }
}
