import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    this.authService.isAdmin$.subscribe(isAdmin => {
      console.log(isAdmin);
    });

    this.authService.currentUser$.subscribe(user => {
      console.log(user)
    });

    return this.authService.isAdmin$.pipe(
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/users/login']);
        }
      }),
      map(isAdmin => isAdmin)
    );
  }

}
