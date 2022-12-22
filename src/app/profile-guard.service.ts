import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    // check if the user is authenticated
    if (!this.authService.isLogged) {
      // if the user is not authenticated, redirect to the login page
      this.router.navigate(['/users/login']);
      return false;
    }
    return true;

  }
}
