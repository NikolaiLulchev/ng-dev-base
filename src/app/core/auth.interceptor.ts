import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {IUser} from "./interfaces/User";
import {AuthService} from "../auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap(event =>{
      if (event instanceof HttpResponse){
        console.log('login/register happened')
        if (event.url.endsWith('login') || event.endsWith('register')){
          const newlyLoggedUser:IUser = event.body;
          this.authService.handleLogin(newlyLoggedUser);
        }
      }
    }));
  }
}
