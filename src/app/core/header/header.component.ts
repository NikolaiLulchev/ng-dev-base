import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '../interfaces/user';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser$: Observable<IUser>;
  isLoggedIn$: Observable<boolean>;
  user: IUser;
  canAddOffer: boolean;
  private isLoggingOut: boolean = false;
  private subscription: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this.subscription = this.currentUser$.subscribe((user) => {
      this.user = user;
      this.canAddOffer = user && (user.role.includes('ADMIN') || user.role.includes('EMPLOYER'));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logoutHandler(): void {
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;
    console.log('logout called');

    this.authService.logout$().subscribe({
      next: () => {
        console.log('Logged out');
      },
      complete: () => {
        this.isLoggingOut = false;
        this.router.navigate(['/home']);
      },
      error: () => {
        this.isLoggingOut = false;
      },
    });
  }
}
