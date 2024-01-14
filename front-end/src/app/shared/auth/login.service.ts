import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private authState = new BehaviorSubject<boolean>(false);
  public authState$ = this.authState.asObservable();
  private readonly baseUrl = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) { }

  loginWithGoogle(): void {
    window.location.href = `${this.baseUrl}/api/auth/google`;
  };
  loginWithFacebook(): void {
    window.location.href = `${this.baseUrl}/api/auth/facebook`;
  }

  checkAuthentication(): void {
    this.httpClient.get<boolean>(`${this.baseUrl}/api/auth/check`, { withCredentials: true })
      .subscribe(isAuthenticated => {
        this.authState.next(isAuthenticated);
      });
  };

  logout(): void {
    this.httpClient.post(`${this.baseUrl}/api/auth/logout`, {})
      .subscribe(() => {
        this.authState.next(false);
      })
  };
}
