import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginValid: boolean = true;
  username: string = '';
  password: string = '';

  onSubmit() {

  }
}
