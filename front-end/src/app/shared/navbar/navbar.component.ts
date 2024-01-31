import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '../interfaces/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showNav?: boolean;
  currentUser: User | null = null;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log("Is menu open:", this.isMenuOpen);

  }
  // Show or hide main navbar - (hide for /user)
  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNav = !(event.urlAfterRedirects.includes('/user') ||
          event.urlAfterRedirects.includes('/login'))
      } else if (event instanceof NavigationEnd) {
        this.showNav = true;
      }
    });
  }

  ngOnInit(): void {
    this.userService.getCurrentUser();
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }


}
