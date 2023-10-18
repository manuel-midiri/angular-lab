import { Component, OnInit } from '@angular/core';
import { User } from './models/general.models';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public userData: User = {} as User;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.userDetail$.subscribe((userDetail: User) => this.userData = userDetail);
  }

}
