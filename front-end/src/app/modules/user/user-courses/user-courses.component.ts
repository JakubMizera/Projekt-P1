import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserCourse } from 'src/app/shared/interfaces/user-courses-list.model';
import { CoursesService } from 'src/app/shared/user/user-courses.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit, OnDestroy {
  courses: UserCourse[] = [];
  private subscription!: Subscription;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.subscription = this.coursesService.courses$.subscribe(courses => {
      this.courses = courses;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
