import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {IUser} from "./core/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class OfferGuard {

  constructor(private authService: AuthService, private router: Router) {
  }



  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.currentUser$.pipe(
      map((user: IUser) => user && (user.role.includes('ADMIN') || user.role.includes('EMPLOYER'))),
      tap(canActivate => {
        if (!canActivate) {
          this.router.navigate(['/users/login']);
        }
      })
    );
  }


// canActivate(): boolean | Observable<boolean> | Promise<boolean> {
  //   return this.authService.currentUser$.pipe(
  //     map(user => user && !user.role.some(role => role === 'USER')),
  //     tap(canActivate => {
  //       if (!canActivate) {
  //         this.router.navigate(['/users/login']);
  //       }
  //     })
  //   );
  // }
}
