import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
