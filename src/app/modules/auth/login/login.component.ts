import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { LoginResponse } from 'src/app/models/general.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private userCredential = { email: 'user@labanalysis.it', password: '03Iw91fypX^b' };
  private adminCredential = { email: 'admin@labanalysis.it', password: '&9GDWy9D6kUs' };

  private localCredentials = this.userCredential;
  public loginForm!: FormGroup;
  public loginError: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).pipe(
        tap((response: LoginResponse) => {
          this.authService.saveToken(response.accessToken, response.accessTokenExpirationDate);
          this.authService.saveRefreshToken(response.refreshToken, response.refreshTokenExpirationDate);
        }, error => {
          this.loginError = error;
          this.cdr.detectChanges();
        }),
        switchMap(() => this.authService.userInfo())
      ).subscribe(
        (response: any) => {
          this.authService.userDetailBS.next(response);
          this.authService.saveUser(response);
          this.router.navigate(['samples']);
        },
        (error) => {
          console.error(error);
        }
        );
      } else {
        this.loginForm.markAllAsTouched();
      }
  }

}
