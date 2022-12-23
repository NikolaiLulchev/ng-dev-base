import {Component} from '@angular/core';
import {IUser} from "../interfaces/user";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  private isLoggingOut: boolean = false;
  user: IUser;
  canAddOffer: boolean;
  private subscription: Subscription;



  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.subscription = this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.canAddOffer = user && (user.role.includes('ADMIN') || user.role.includes('EMPLOYER'));
    });
  }

  // ngOnInit(): void {
  //   this.isLoggedIn$ = this.authService.isLoggedIn$;
  //   this.subscription = this.authService.currentUser$.subscribe((user) => {
  //     this.user = user;
  //     this.canAddOffer = user && (user.role.includes('ADMIN') || user.role.includes('EMPLOYER'));
  //   });
  // }
  //
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

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
