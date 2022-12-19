import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginValid=true;
  username: string | undefined;
  password: string | undefined;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    // console.log(this.files.nativeElement.files);
    if (form.invalid) {
      return;
    }
    const {username, password} = form.value;
    this.authService.login$({username, password})
      .subscribe(user => {
        this.router.navigate(['/']);
      });

    const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    this.router.navigate([returnUrl]);
  }

  // handleLogin(): void {
  //   // console.log('fromNgSubmit', this.loginFormGroup.valid);
  //
  //   this.authService.login$(this.loginFormGroup.value).subscribe({
  //     next: () => {
  //       if (this.activatedRoute.snapshot.queryParams['redirect-to']) {
  //         this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['redirect-to'])
  //       } else {
  //         this.router.navigate(['/home']);
  //       }
  //     },
  //     complete: () => {
  //       console.log('login stream completed')
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.error.message;
  //     }
  //   });
  // }


}
