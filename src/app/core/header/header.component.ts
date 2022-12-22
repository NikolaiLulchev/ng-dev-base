import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {IUser} from "../interfaces/user";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private isLoggingOut: boolean = false;


  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  logoutHandler(): void {
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;
    console.log('logout called');

    this.authService.logout$().subscribe({
      next: args => {
        console.log(args);
      },
      complete: () => {
        this.isLoggingOut = false;
        this.router.navigate(['/home']);
      },
      error: () => {
        this.isLoggingOut = false;
      }
    });
  }
}
