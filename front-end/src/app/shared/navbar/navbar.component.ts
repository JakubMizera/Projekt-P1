import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showNav?: boolean;

  // Show or hide main navbar - (hide for /user)
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects.includes('/user')) {
        this.showNav = false;
      } else if (event instanceof NavigationEnd) {
        this.showNav = true;
      }
    });
  }
}
