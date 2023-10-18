import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private authService: AuthService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

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
          console.log(response);
          this.authService.userDetailBS.next(response);
          response.roles.includes('Admin') ? this.authService.saveRole('Admin') : this.authService.saveRole('User');
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
