import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AdventureSport';
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.checkAuthentication();
  }
}

