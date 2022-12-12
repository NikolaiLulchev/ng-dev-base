import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {UserService} from "../../core/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginValid: boolean = true;
  username: string | undefined;
  password: string | undefined;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private authService: AuthService, private userService: UserService) {
  }

  onSubmit(loginForm: NgForm): void {
    if (loginForm.invalid) { return; }
    const { username, password } = loginForm.value;
    this.authService.login(username!, password!)
      .subscribe(user => {
        this.router.navigate(['/home']);
      });

    const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    this.router.navigate([returnUrl]);
  }
}
