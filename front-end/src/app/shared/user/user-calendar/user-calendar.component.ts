import { Component } from '@angular/core';
import { Course } from '../../interfaces/course.model';
import { ApiCoursesService } from '../api-courses.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent {
  currentDate = new Date();
  currentMonth: Date[] = [];
  currentWeek: Date[] = [];
  dayNames = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'];
  userCourses: Course[] = [];

  constructor(
    private apiCoursesService: ApiCoursesService,
    private userService: UserService,
    private router: Router,
  ) {
    this.generateMonth();
    this.generateWeek();
    this.loadUserCourses();
  }

  loadUserCourses(): void {
    this.userService.currentUser$.subscribe(user => {
      if (user && user._id) {
        this.apiCoursesService.getUserCourses(user._id).subscribe(courses => {
          this.userCourses = courses;
        });
      }
    })
  }

  isCourseOnDate(date: Date): boolean {
    return this.userCourses.some(course => {
      const courseDate = new Date(course.eventDate);
      return (
        date.getDate() === courseDate.getDate() &&
        date.getMonth() === courseDate.getMonth() &&
        date.getFullYear() === courseDate.getFullYear()
      );
    });
  }

  getCoursesOnDate(date: Date): Course[] {
    return this.userCourses.filter(course => {
      const courseDate = new Date(course.eventDate);
      return (
        date.getDate() === courseDate.getDate() &&
        date.getMonth() === courseDate.getMonth() &&
        date.getFullYear() === courseDate.getFullYear()
      );
    });
  }

  navigateMonth(step: number): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + step, 1);
    this.generateMonth();
    this.setFirstWeekOfMonth();
  }

  setFirstWeekOfMonth(): void {
    // Clear the currentWeek array
    this.currentWeek = [];

    // Start of the first week of the current month
    let startOfWeek = this.getStartOfWeek(this.currentDate);

    // Generate the first week of the month
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      this.currentWeek.push(day);
    }
  }

  getMonthName(): string {
    const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
      'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    return monthNames[this.currentDate.getMonth()];
  }

  generateMonth(): void {
    this.currentMonth = []; // Clear the currentMonth array

    const startOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const endOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    // Get the day of the week for the first day of the month (0 is Sunday, 1 is Monday, etc.)
    const firstDayOfWeek = startOfMonth.getDay();

    // Adjust to start the calendar on Monday
    // If the first day is Sunday (0), set it to 7 to make the loop start at the previous Monday
    const daysToMonday = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    // Add the days from the previous month to fill up the first week
    for (let i = daysToMonday; i > 0; i--) {
      const previousMonthDay = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), -i + 1);
      this.currentMonth.push(previousMonthDay);
    }

    // Now add all the days of the current month
    for (let day = new Date(startOfMonth); day <= endOfMonth; day.setDate(day.getDate() + 1)) {
      this.currentMonth.push(new Date(day));
    }

    // If the last day of the month is not Sunday, add the next days to complete the week
    const lastDayOfWeek = endOfMonth.getDay();
    if (lastDayOfWeek !== 0) {
      for (let i = 1; i <= (7 - lastDayOfWeek); i++) {
        const nextMonthDay = new Date(endOfMonth.getFullYear(), endOfMonth.getMonth() + 1, i);
        this.currentMonth.push(nextMonthDay);
      }
    }
  }

  setCurrentWeek(date: Date): void {
    const startOfWeek = this.getStartOfWeek(date);
    this.currentWeek = []; // Clear the currentWeek array
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      this.currentWeek.push(day);
    }
  }

  generateWeek(): void {
    const startOfWeek = this.getStartOfWeek(this.currentDate);
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      this.currentWeek.push(day);
    }
  }

  getStartOfWeek(date: Date): Date {
    const newDate = new Date(date);
    const day = newDate.getDay() || 7; // Get the day or default to 7 (Sunday)
    if (day !== 1) newDate.setHours(-24 * (day - 1)); // Adjust to previous Monday
    return newDate;
  }

  navigateToCourseDetails(courseId: string): void {
    this.router.navigate(['user', 'courses', courseId, 'details']);
  }

}
