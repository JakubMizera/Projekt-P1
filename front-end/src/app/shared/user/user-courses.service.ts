import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCourse } from '../interfaces/user-courses-list.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly localStorageKey = 'userCourses';
  private coursesSubject!: BehaviorSubject<UserCourse[]>;
  public courses$: Observable<UserCourse[]>;

  constructor() {
    this.coursesSubject = new BehaviorSubject<UserCourse[]>([]);
    this.courses$ = this.coursesSubject.asObservable();
    const initialCourses = this.getCoursesFromLocalStorage();
    this.coursesSubject.next(initialCourses);
  }

  // Create
  addCourse(course: UserCourse): void {
    const currentCourses = this.coursesSubject.getValue();
    const updatedCourses = [...currentCourses, course];
    this.updateCoursesInLocalStorage(updatedCourses);
  }

  // Read from localStorage, initialize if empty
  private getCoursesFromLocalStorage(): UserCourse[] {
    const coursesJSON = localStorage.getItem(this.localStorageKey);
    if (coursesJSON) {
      return JSON.parse(coursesJSON);
    } else {
      const defaultCourses = this.initializeCourses();
      this.updateCoursesInLocalStorage(defaultCourses);
      return defaultCourses;
    }
  }

  // Update
  updateCourse(updatedCourse: UserCourse): void {
    const currentCourses = this.coursesSubject.getValue();
    const updatedCourses = currentCourses.map(course =>
      course.name === updatedCourse.name ? updatedCourse : course
    );
    this.updateCoursesInLocalStorage(updatedCourses);
  }

  // Delete
  deleteCourse(courseName: string): void {
    const currentCourses = this.coursesSubject.getValue();
    const updatedCourses = currentCourses.filter(course => course.name !== courseName);
    this.updateCoursesInLocalStorage(updatedCourses);
  }

  // Helper to update localStorage and BehaviorSubject
  private updateCoursesInLocalStorage(courses: UserCourse[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(courses));
    this.coursesSubject.next(courses);
  }

  // Initialize with default courses
  private initializeCourses(): UserCourse[] {
    const defaultCourses: UserCourse[] = [
      { name: 'Strzelectwo', status: 'active', amountBought: 50, price: 29.99 },
      { name: 'Skok ze spadochronem', status: 'active', amountBought: 75, price: 39.99 },
      { name: 'Koszykówka', status: 'inactive', amountBought: 100, price: 19.99 }
    ];
    return defaultCourses;
  }
}
