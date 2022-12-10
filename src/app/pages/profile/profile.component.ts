import {Component} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    id: 1,
    username: "admin",
    password: "7e2636a9011da67d053968fa88f0e5fcc01a3b359ac82f02ad646b50a6ade44b718c23c9409cdda0",
    email: "admin@jobboard.com",
    age: 41,
    gender: "MALE",
    role: [
      {
        id: 3,
        role: "ADMIN"
      },
      {
        id: 2,
        role: "EMPLOYER"
      },
      {
        id: 1,
        role: "USER"
      }
    ],
    level: "SENIOR",
    techStack: [{
      "id": 10,
      "techStack": "MONGO_DB"
    },
      {
        "id": 9,
        "techStack": "ANGULAR"
      },
      {
        "id": 8,
        "techStack": "REACT"
      }
      ],
    firstName: "Admin",
    lastName: "Adminov"
  };

}
