import { Component } from '@angular/core';
import { GoogleAuthService } from 'src/app/shared/auth/google.auth.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private googleAuthService: GoogleAuthService) {}

  login(): void {
    this.googleAuthService.login();
  }

}
