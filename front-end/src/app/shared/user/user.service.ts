import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCurrentUser(): void {
    this.http.get<User>(`${this.baseUrl}/api/users/current`, { withCredentials: true })
      .subscribe({
        next: (userData) => this.currentUserSubject.next(userData),
        error: (error) => {
          console.error('Error fetching user data', error);
          this.currentUserSubject.next(null);
        }
      });
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
  }
}
