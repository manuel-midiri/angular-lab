import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private userCredential = { email: 'user@labanalysis.it', password: '03Iw91fypX^b' };
  private adminCredential = { email: 'admin@labanalysis.it', password: '&9GDWy9D6kUs' };

  private localCredentials = this.userCredential;

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login(this.localCredentials).subscribe(
      (response) => {
        console.log('res login', response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
