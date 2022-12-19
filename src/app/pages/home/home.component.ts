import { Component } from '@angular/core';
import {IUser} from "../../core/interfaces/user";
import {AuthService} from "../../auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser$: Observable<IUser> = this.authService.currentUser$;

  constructor(public authService: AuthService){}

}
