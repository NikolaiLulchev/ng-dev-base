import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: boolean | undefined;
  username: any;
  password: any;
  firstName: any;
  lastName: any;
  email: any;
  repassword: any;
  role: any;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(registerForm: NgForm) {
    console.log(registerForm.value);
    this.authService.register$(registerForm.value).subscribe({
      next: (user) => {
        console.log(user)
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
