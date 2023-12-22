import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginService } from './../auth/login.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.loginService.authState$.pipe(
      take(1), // Take only one value from the stream
      map(isAuthenticated => {
        if (!isAuthenticated) {
          // User not authenticated, redirect to login page
          this.router.navigate(['/login']);
          return false;
        }
        return true; // User is authenticated
      })
    );
  }
}
