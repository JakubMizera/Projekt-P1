import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseCategory } from 'src/app/shared/interfaces/course-category.model';
import { Course } from 'src/app/shared/interfaces/course.model';
import { Status } from 'src/app/shared/interfaces/course-status.model';
import { ApiCoursesService } from 'src/app/shared/user/user-courses.api.service';

@Component({
  selector: 'app-user-add-course',
  templateUrl: './user-add-course.component.html',
  styleUrls: ['./user-add-course.component.scss']
})
export class UserAddCourseComponent implements OnInit {
  courseForm!: FormGroup;
  courseCategories = Object.keys(CourseCategory).map(key => ({
    key: key,
    value: CourseCategory[key as keyof typeof CourseCategory]
  }))

  constructor(
    private formBuilder: FormBuilder,
    private apiCoursesService: ApiCoursesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      accountNumber: [null, Validators.required],
      status: Status.Active,
      additionDate: [new Date()],
      expirationDate: [null, Validators.required],
      category: [CourseCategory.None],
      // courseId: [50123],
      // location: this.formBuilder.group({
      //   latitude: [null, [Validators.required, Validators.min(-90), Validators.max(90)]],
      //   longitude: [null, [Validators.required, Validators.min(-180), Validators.max(180)]],
      // }),
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const newCourse: Course = this.courseForm.value;
      this.apiCoursesService.addCourse(newCourse).subscribe({
        next: () => this.router.navigate(['/user/courses']),
        error: (error) => console.error(error),
      })
      this.courseForm.reset();
    }
  }

}
