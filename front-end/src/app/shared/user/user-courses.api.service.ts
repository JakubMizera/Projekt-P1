
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Course } from '../interfaces/course.model';

@Injectable({
  providedIn: 'root'
})
export class ApiCoursesService {
  private readonly apiUrl = 'http://localhost:5000/api';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.httpClient.get<Course[]>(`${this.apiUrl}/courses`).subscribe(courses => {
      this.coursesSubject.next(courses);
    });
  }

  getCourseById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  addCourse(course: Course): Observable<Course> {
    return this.httpClient.post<Course>(`${this.apiUrl}/courses`, course).pipe(
      tap(newCourse => {
        const currentCourses = this.coursesSubject.getValue();
        this.coursesSubject.next([...currentCourses, newCourse]);
      })
    )
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.httpClient.put<Course>(`${this.apiUrl}/courses/${id}`, course).pipe(
      tap(updatedCourse => {
        const currentCourses = this.coursesSubject.getValue();
        this.coursesSubject.next(
          currentCourses.map(course => course._id === id ? updatedCourse : course)
        )
      })
    )
  }

  deleteCourse(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/courses/${id}`).pipe(
      tap(() => {
        const currentCourses = this.coursesSubject.getValue();
        this.coursesSubject.next(currentCourses.filter(course => course._id !== id));
      })
    )
  }

}
