import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { Course } from '../interfaces/course.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiUserCoursesService {
  private readonly apiUrl = 'http://localhost:5000/api';
  private userCoursesSubject = new BehaviorSubject<Course[]>([]);
  public userCourses$ = this.userCoursesSubject.asObservable();

  private courseDeletedSubject = new Subject<string>(); // Subject to emit deleted course ID
  courseDeleted$ = this.courseDeletedSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  getUserCourses(userId: string): void {
    this.httpClient.get<Course[]>(`${this.apiUrl}/courses/user/${userId}`, { withCredentials: true })
      .subscribe(courses => {
        this.userCoursesSubject.next(courses);
      });
  }

  deleteUserCourse(courseId: string, userId: string): Observable<Course> {
    return this.httpClient.delete<Course>(`${this.apiUrl}/courses/${courseId}`, { withCredentials: true }).pipe(
      tap(() => {
        // this.getUserCourses(userId); // Refresh user courses after deletion
        const currentUserCourses = this.userCoursesSubject.getValue();
        this.userCoursesSubject.next(currentUserCourses.filter(course => course._id !== courseId));
        this.courseDeletedSubject.next(courseId);
      }),
      catchError(error => {
        console.error('Error deleting course', error);
        return throwError(() => error);
      })
    );
  }

}
