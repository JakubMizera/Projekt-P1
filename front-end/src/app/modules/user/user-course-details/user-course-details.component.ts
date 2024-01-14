import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/shared/interfaces/course.model';
import { ApiCoursesService } from 'src/app/shared/user/api-courses.service';

@Component({
  selector: 'app-user-course-details',
  templateUrl: './user-course-details.component.html',
  styleUrls: ['./user-course-details.component.scss']
})
export class UserCourseDetailsComponent implements OnInit, OnDestroy {
  routeSubscription!: Subscription;
  id!: string;
  course!: Course;

  constructor(
    private apiCoursesService: ApiCoursesService,
    private route: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = params['_id'];
    })
    this.apiCoursesService.getCourseById(this.id).subscribe((courseData) => {
      this.course = courseData;
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
