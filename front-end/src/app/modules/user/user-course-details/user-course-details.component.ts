import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/shared/interfaces/course.model';
import { ApiCoursesService } from 'src/app/shared/user/api-courses.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-user-course-details',
  templateUrl: './user-course-details.component.html',
  styleUrls: ['./user-course-details.component.scss']
})
export class UserCourseDetailsComponent implements OnInit, OnDestroy {
  routeSubscription!: Subscription;
  course!: Course;
  courseId!: string;
  userId!: string;

  constructor(
    private apiCoursesService: ApiCoursesService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.courseId = params['_id'];
    })

    this.apiCoursesService.getCourseById(this.courseId).subscribe((courseData) => {
      this.course = courseData;
    })

    this.userService.currentUser$.subscribe((user) => {
      if (user && user._id) {
        this.userId = user._id
      }
    })
  }

  reserveCourse(): void {
    this.apiCoursesService.reserveCourse(this.courseId, this.userId).subscribe(() => {

    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
