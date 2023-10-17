import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.getRefreshToken()) {
      return true;
    }
    this.router
      .navigate(['/login'])
      .then(() => console.log('Redirect to login'));

    return false;
  }
  
}
