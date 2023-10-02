import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);

  public myForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    const { email, password } = this.myForm.value;

    this._authService.login(email, password).subscribe((success) => {
      console.log({ success });
    });
  }
}
