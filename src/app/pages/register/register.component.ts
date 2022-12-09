import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loginValid: boolean | undefined;
  username: any;
  password: any;
  firstName: any;
  lastName: any;
  email: any;
  repassword: any;

  onSubmit() {

  }
}
