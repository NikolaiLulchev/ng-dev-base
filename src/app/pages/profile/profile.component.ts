import {Component} from '@angular/core';
import {IBaseUser} from "../../core/interfaces/baseUser";
import {UserService} from "../../core/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  currentUser!: IBaseUser;

  isInEditMode: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfile$(this.currentUser?.id).subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.router.navigate(['/login'])
      }
    })
  }

  // user = {
  //   id: 1,
  //   username: "admin",
  //   password: "7e2636a9011da67d053968fa88f0e5fcc01a3b359ac82f02ad646b50a6ade44b718c23c9409cdda0",
  //   email: "admin@jobboard.com",
  //   age: 41,
  //   gender: "MALE",
  //   role: [
  //     {
  //       id: 3,
  //       role: "ADMIN"
  //     },
  //     {
  //       id: 2,
  //       role: "EMPLOYER"
  //     },
  //     {
  //       id: 1,
  //       role: "USER"
  //     }
  //   ],
  //   level: "SENIOR",
  //   techStack: [{
  //     "id": 10,
  //     "techStack": "MONGO_DB"
  //   },
  //     {
  //       "id": 9,
  //       "techStack": "ANGULAR"
  //     },
  //     {
  //       "id": 8,
  //       "techStack": "REACT"
  //     }
  //     ],
  //   firstName: "Admin",
  //   lastName: "Adminov"
  // };

}
