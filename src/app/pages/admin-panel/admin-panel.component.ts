import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../core/interfaces/user";
import {UserService} from "../../core/user.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  users: IUser[] = [];
  displayedColumns = ['username', 'level', 'role', 'action'];

  constructor(private http: HttpClient, private userService: UserService) {
  }

  ngOnInit() {
  }

  onLoadUsers(): void {
    // Call the loadUsers() function from the UserService to get a list of users
    this.userService.loadUsers().subscribe({
      // If the request is successful, assign the list of users to a property on the component
      next: (users: IUser[]) => {
        this.users = users;
      },
      // If there is an error, log it to the console
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
