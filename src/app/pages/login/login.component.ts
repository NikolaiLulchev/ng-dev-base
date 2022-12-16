import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';

  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', {validators: [myRequired, emailValidator], updateOn: 'submit'}),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)])
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private messageBus: MessageBusService,
    private router: Router) {
  }

  ngOnInit(): void {

    // this.loginFormGroup.get('email').valueChanges.subscribe(value => {
    //   console.log('email changed', value);
    // })
  }

  loginHandler(): void {
    // TODO stoimenovg: validate user's data.
    // this.userService.login();
    // this.router.navigate(['/home']);

    // console.log('fromClickHandler', this.loginFormGroup.valid);
  }

  handleLogin(): void {
    // console.log('fromNgSubmit', this.loginFormGroup.valid);

    this.errorMessage = '';
    this.authService.login$(this.loginFormGroup.value).subscribe({
      next: () => {
        if (this.activatedRoute.snapshot.queryParams['redirect-to']) {
          this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['redirect-to'])
        } else {
          this.router.navigate(['/home']);
        }

        this.messageBus.notifyForMessage({text: 'User successfully logged in!', type: MessageType.Success})
      },
      complete: () => {
        console.log('login stream completed')
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
  }
}
