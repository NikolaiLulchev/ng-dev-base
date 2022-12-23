import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {sameValueGroupValidator} from "../../util/utils";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    email: ['', [Validators.required,Validators.email]],
    role: ['', [Validators.required]],
    pass: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      rePassword: []
    }, {
      validators: [sameValueGroupValidator('password', 'rePassword')]
    })
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    const userData ={
      email: this.registerForm.value.email,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      password: this.registerForm.value.pass.password,
      confirmPassword: this.registerForm.value.pass.rePassword,
      role: this.registerForm.value.role,
      username: this.registerForm.value.username,
    }
    this.authService.register$(userData).subscribe({
      next: (user) => {
        console.log(user)
        this.authService.login$(user);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
