import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {PasswordValidation} from "../../util/password-validator";
import {HttpErrorResponse} from "@angular/common/http";

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
    email: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required]],
    pass: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      rePassword: ['', [Validators.required]]
    }, {
      validators: PasswordValidation.MatchPassword
    })
  });


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    const userData = {
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
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          const errorMessages = new Array<{ propName: string; errors: string }>();
          const validationErrors = err.error;

          if (err.status === 422) {
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.registerForm.get(prop);
              if (formControl) {
                formControl.setErrors({
                  serverError: validationErrors[prop]
                });
              }
            });
          }
        }
      }
    })
  }
}
