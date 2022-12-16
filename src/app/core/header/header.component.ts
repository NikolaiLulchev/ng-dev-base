import { Component } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IUser} from "../interfaces/User";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  message: string;
  isMessageError: boolean;

  private isLoggingOut: boolean = false;

  private subscription: Subscription;

  constructor(public authService: AuthService, private router: Router, private messageBus: MessageBusService) {
  }

  ngOnInit(): void {
    this.subscription = this.messageBus.onNewMessage$.subscribe(newMessage => {
      console.log('onNewMessage$.subscribe', newMessage);
      this.message = newMessage?.text || '';
      this.isMessageError = newMessage?.type === MessageType.Error;

      if (this.message) {
        setTimeout(() => {
          this.messageBus.clear();
        }, 5000);
      }
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
