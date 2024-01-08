import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/auth/login.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  baseTitle = 'Adventure Sport';

  constructor(
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginService.checkAuthentication();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((data) => {
      const title = data['title'];
      if (title) {
        this.titleService.setTitle(`${this.baseTitle} | ${title}`);
      }
    });
  }
}

