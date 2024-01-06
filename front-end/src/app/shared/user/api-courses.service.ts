import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Course } from '../interfaces/course.model';
import { ApiUserCoursesService } from './api-user-courses.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCoursesService {
  private readonly apiUrl = 'http://localhost:5000/api';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private apiUserCoursesService: ApiUserCoursesService,
  ) {
    this.loadInitialCourses();
    this.apiUserCoursesService.courseDeleted$.subscribe(() => {
      this.loadInitialCourses();
    })
  }

  private loadInitialCourses(): void {
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
    return this.httpClient.put<Course>
      (
        `${this.apiUrl}/courses/${id}`,
        course,
        { withCredentials: true }
      ).pipe(
        tap(updatedCourse => {
          const currentCourses = this.coursesSubject.getValue();
          this.coursesSubject.next(
            currentCourses.map(course => course._id === id ? updatedCourse : course)
          )
        })
      )
  }

  deleteCourse(id: string): Observable<Course> {
    return this.httpClient.delete<Course>(`${this.apiUrl}/courses/${id}`, { withCredentials: true }).pipe(
      tap(() => {
        const currentCourses = this.coursesSubject.getValue();
        this.coursesSubject.next(currentCourses.filter(course => course._id !== id));
      })
    )
  }

}
