import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor() { }

  loginWithGoogle(): void {
    // Redirects the user to the backend OAuth endpoint
    window.location.href = 'http://localhost:5000/api/auth/google';
  }
}
