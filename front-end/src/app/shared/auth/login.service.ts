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
    // Redirects the user to the backend OAuth endpoint
    window.location.href = `${this.baseUrl}/api/auth/google`;
  };

  checkAuthentication(): void {
    this.httpClient.get<boolean>(`${this.baseUrl}/auth/check`, { withCredentials: true })
      .subscribe(isAuthenticated => {
        this.authState.next(isAuthenticated);
      });
  };

  logout(): void {
    this.httpClient.post(`${this.baseUrl}/auth/logout`, {})
      .subscribe(() => {
        this.authState.next(false);
      })
  };
}
