import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {SessionService} from "../services/session/session.service"
import {Observable} from "rxjs"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Authorization' : this.sessionService.getTokens().accessTokenCognito ?? '',
      },
    });

    return next.handle(req);
  }
}
