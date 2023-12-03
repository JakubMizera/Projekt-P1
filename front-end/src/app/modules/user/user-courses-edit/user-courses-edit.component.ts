import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CourseCategory } from "src/app/shared/interfaces/course-category.model";
import { Course } from "src/app/shared/interfaces/course.model";
import { CoursesService } from "src/app/shared/user/user-courses.service";

@Component({
  selector: 'app-user-courses-edit',
  templateUrl: './user-courses-edit.component.html',
  styleUrls: ['./user-courses-edit.component.scss']
})
export class UserCoursesEditComponent implements OnInit, OnDestroy {
  editCourseForm!: FormGroup;
  routeSubscription!: Subscription;
  courseSubscription!: Subscription;
  courseId!: number;
  course!: Course;
  courseCategories = Object.keys(CourseCategory).map(key => ({
    key: key,
    value: CourseCategory[key as keyof typeof CourseCategory]
  }))

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.courseId = Number(params['courseId']);
      this.loadCourse(this.courseId);
    })

    if (this.course) {
      this.editCourseForm = this.fb.group({
        title: new FormControl(this.course.title, Validators.required),
        description: new FormControl(this.course.description, Validators.required),
        address: new FormControl(this.course.address, Validators.required),
        price: new FormControl(this.course.price, [Validators.required, Validators.min(0)]),
        accountNumber: new FormControl(this.course.accountNumber, Validators.required),
        status: new FormControl(this.course.status, Validators.required),
        expirationDate: new FormControl(this.course.expirationDate, Validators.required),
        category: new FormControl(this.course.category),
      })
    } else {
      throw new Error(`Cannot find course with id = ${this.courseId}`);
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }

  loadCourse(courseId: number): void {
    this.courseSubscription = this.coursesService.getCourseById(courseId).subscribe(course => {
      if (course) {
        this.course = course;
      }
    })
  }

  onSubmit(): void {
    if (this.editCourseForm.valid) {
      const updatedCourse: Course = {
        ...this.editCourseForm.value,
        courseId: this.courseId
      };

      this.coursesService.updateCourse(updatedCourse);
      this.router.navigate(['user/courses']);
    }
  }

}