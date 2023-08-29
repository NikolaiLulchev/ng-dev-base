import {AbstractControl} from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    if (AC.get('rePassword').touched || AC.get('rePassword').dirty) {
      let verifyPassword = AC.get('rePassword').value;

      if (password != verifyPassword) {
        AC.get('rePassword').setErrors({MatchPassword: true})
      } else {
        return null
      }
    }
  }
}
