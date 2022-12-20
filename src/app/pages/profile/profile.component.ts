import {Component} from '@angular/core';
import {IUser} from "../../core/interfaces/user";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

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
    this.authService.authenticate().pipe(
      catchError((error) => {
        console.error(error); // log the error to the console
        this.router.navigate(['/users/login']); // redirect the user to the login page
        return of(null); // return an observable with a null value
      })
    ).subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });
  }

  editMode() {
    this.router.navigate(['/users/edit'])
  }
}
