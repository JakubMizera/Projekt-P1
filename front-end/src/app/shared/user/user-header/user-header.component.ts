import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { UserService } from '../user.service';
import { User } from '../../interfaces/user.model';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser();
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.loginService.logout();
    this.userService.clearCurrentUser();
    this.router.navigate(['/']);
  }
}
