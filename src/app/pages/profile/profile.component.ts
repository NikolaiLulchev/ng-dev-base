import {Component} from '@angular/core';
import {IUser} from "../../core/interfaces/user";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  currentUser: IUser;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.authenticate().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.router.navigate(['/users/login'])
      }
    })
  }

  editMode() {
    this.router.navigate(['/users/edit'])
  }
}
