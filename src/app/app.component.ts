import { Component, OnInit } from '@angular/core';
import { User } from './models/general.models';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public userData: User = {} as User;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    if (this.authService.getToken() && this.authService.getUser()) {
      this.authService.userDetailBS.next(JSON.parse(this.authService.getUser()));
    }
    this.authService.userDetail$.subscribe((userDetail: User) => this.userData = userDetail);
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
