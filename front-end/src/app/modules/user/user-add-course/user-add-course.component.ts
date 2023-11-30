import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseCategory } from 'src/app/shared/interfaces/course-category.model';
import { Course } from 'src/app/shared/interfaces/course.model';
import { CoursesService } from 'src/app/shared/user/user-courses.service';
import { expirationDateValidator } from 'src/app/shared/validators/custom-validators';

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
    private coursesService: CoursesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      accountNumber: [null, Validators.required],
      isActive: [true],
      additionDate: [new Date()],
      expirationDate: [null, Validators.required],
      category: [CourseCategory.None],
      // location: this.formBuilder.group({
      //   latitude: [null, [Validators.required, Validators.min(-90), Validators.max(90)]],
      //   longitude: [null, [Validators.required, Validators.min(-180), Validators.max(180)]],
      // }),
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const newCourse: Course = this.courseForm.value;
      this.coursesService.addCourse(newCourse);
      this.courseForm.reset();
      this.router.navigate(['/user/courses']);
    }
  }

}
