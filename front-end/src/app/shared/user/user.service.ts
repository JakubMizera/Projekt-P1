import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.model';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  getCurrentUser(): void {
    this.httpClient.get<User>(`${this.baseUrl}/api/users/current`, { withCredentials: true })
      .subscribe({
        next: (userData) => this.currentUserSubject.next(userData),
        error: (error) => {
          console.error('Error fetching user data', error);
          this.currentUserSubject.next(null);
        }
      });
  }

  updateCurrentUser(userData: User): Observable<User> {
    const userId = this.getCurrentUserValue()?._id;
    if (!userId) {
      console.error('User id not found');
    }
    return this.httpClient.put<User>
      (`${this.baseUrl}/api/users/${userId}`, userData, { withCredentials: true }).pipe(
        tap(updatedUser => {
          this.currentUserSubject.next(updatedUser);
        }),
        catchError(error => {
          console.error(error);
          return throwError(() => new Error('Error updating currentUser$ subject'));
        })
      )
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
  }
}
