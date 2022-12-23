import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {sameValueGroupValidator} from "../../util/utils";
import {CreateUserDto} from "../../core/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  role: any;
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    email: ['', [Validators.required]],
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
    if (this.registerForm.invalid) { return; }
    console.log(this.registerForm.value);
    let registerForm = this.registerForm.value;
    this.authService.register$(<CreateUserDto>registerForm).subscribe({
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
