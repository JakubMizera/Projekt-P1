import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../interfaces/course.model';
import { CourseCategory } from '../interfaces/course-category.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly localStorageKey = 'userCourses';
  private coursesSubject!: BehaviorSubject<Course[]>;
  public courses$: Observable<Course[]>;

  constructor() {
    this.coursesSubject = new BehaviorSubject<Course[]>([]);
    this.courses$ = this.coursesSubject.asObservable();
    const initialCourses = this.getCoursesFromLocalStorage();
    this.coursesSubject.next(initialCourses);
  }

  // Create
  addCourse(course: Course): void {
    const currentCourses = this.coursesSubject.getValue();
    const nextId = currentCourses.length === 0 ? 1 : Math.max(...currentCourses.map(c => c.courseId)) + 1;
    const newCourse = { ...course, courseId: nextId };
    const updatedCourses = [...currentCourses, newCourse];
    this.updateCoursesInLocalStorage(updatedCourses);
  }

  // Read from localStorage, initialize if empty
  private getCoursesFromLocalStorage(): Course[] {
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
  updateCourse(updatedCourse: Course): void {
    const currentCourses = this.coursesSubject.getValue();
    const updatedCourses = currentCourses.map(course =>
      course.courseId === updatedCourse.courseId ? updatedCourse : course
    );
    this.updateCoursesInLocalStorage(updatedCourses);
  }

  // Delete
  deleteCourse(courseId: number): void {
    const currentCourses = this.coursesSubject.getValue();
    const updatedCourses = currentCourses.filter(course => course.courseId !== courseId);
    this.updateCoursesInLocalStorage(updatedCourses);
  }

  // Helper to update localStorage and BehaviorSubject
  private updateCoursesInLocalStorage(courses: Course[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(courses));
    this.coursesSubject.next(courses);
  }

  // Initialize with default courses
  private initializeCourses(): Course[] {
    const defaultCourses: Course[] = [
      {
        courseId: 1,
        author: {
          userId: 1,
          firstName: 'John',
          lastName: 'Travolta',
          phoneNumber: '+48999888777',
          email: 'JohnTravolta@gmail.com',
        },
        title: 'Shooting Course',
        description: 'Learn the basics of shooting.',
        address: 'Kraków, ul. Krakowska 12',
        images: [''],
        price: 29.99,
        accountNumber: 1234567890,
        isActive: true,
        additionDate: new Date(),
        expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // One year from now
        category: CourseCategory.Shooting,
        requirements: ['Beginner level', '18+ years old'],
        location: {
          latitude: 40.712776,
          longitude: -74.005974
        }
      },
      {
        courseId: 2,
        author: {
          userId: 1,
          firstName: 'Raul',
          lastName: 'Gillete',
          phoneNumber: '+48563847104',
          email: 'RaulGillete@gmail.com',
        },
        title: 'Parachuting Course',
        description: 'Experience the thrill of skydiving.',
        address: 'Warszawa, ul. Warszawska 12',
        images: [''],
        price: 39.99,
        accountNumber: 1234567891,
        isActive: true,
        additionDate: new Date(),
        expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // One year from now
        category: CourseCategory.Parachuting,
        requirements: ['Advanced level', 'Health certificate'],
        location: {
          latitude: 51.507351,
          longitude: -0.127758
        }
      },
      {
        courseId: 3,
        author: {
          userId: 1,
          firstName: 'Max',
          lastName: 'Verstappen',
          phoneNumber: '+48646414123',
          email: 'MaxVerstappen@gmail.com',
        },
        title: 'Gocart Course',
        description: 'Improve your gocart skills.',
        address: 'Gdańsk, ul. Gdańska 123',
        images: [''],
        price: 19.99,
        accountNumber: 1234567892,
        isActive: false,
        additionDate: new Date(),
        expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // One year from now
        category: CourseCategory.CarRacing,
      }
    ];
    return defaultCourses;
  }
}
