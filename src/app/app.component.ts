import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'authApp';

  private _authService = inject(AuthService);
  private _router = inject(Router);

  public finishedAuthCheck = computed<boolean>(() => {
    if (this._authService.authStatus() === AuthStatus.checking) return false;

    return true;
  });

  public authStatusChangedEffect = effect(() => {
    switch (this._authService.authStatus()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authtenticated:
        this._router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.notAuthenticated:
        this._router.navigateByUrl('/auth/login');
        return;
    }
  });
}
