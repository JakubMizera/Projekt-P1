import { Component } from '@angular/core';
import { LoginService } from 'src/app/shared/auth/login.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private loginService: LoginService) { }

  login(): void {
    this.loginService.loginWithGoogle();
  }
  loginWithFacebook(): void {
    this.loginService.loginWithFacebook();
  }

}
