import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course } from '../interfaces/course.model';


@Injectable({
  providedIn: 'root'
})
export class ApiCoursesService {
  private readonly apiUrl = 'http://localhost:5000/api';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  constructor(
    private httpClient: HttpClient
  ) {
    this.loadAllCourses();
  }

  private loadAllCourses(): void {
    this.httpClient.get<Course[]>(`${this.apiUrl}/courses`).subscribe(courses => {
      this.coursesSubject.next(courses);
    });
  }

  getUserCourses(userId: string): Observable<Course[]> {
    return this.courses$.pipe(
      map(courses => courses.filter(course => course.createdBy === userId))
    );
  }

  getCourseById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  addCourse(course: Course): Observable<Course> {
    return this.httpClient.post<Course>(`${this.apiUrl}/courses`, course).pipe(
      tap(() => this.loadAllCourses())
    );
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.httpClient.put<Course>
      (`${this.apiUrl}/courses/${id}`, course, { withCredentials: true }).pipe(
        tap(() => this.loadAllCourses())
      );
  }

  deleteCourse(id: string): Observable<Course> {
    return this.httpClient.delete<Course>(`${this.apiUrl}/courses/${id}`, { withCredentials: true }).pipe(
      tap(() => this.loadAllCourses())
    );
  }

}
