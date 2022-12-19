import {Component} from '@angular/core';
import {IUser} from "../../core/interfaces/user";
import {UserService} from "../../core/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  currentUser: IUser;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.router.navigate(['/users/login'])
      }
    })
  }

}
