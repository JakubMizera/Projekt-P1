import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseCategory } from 'src/app/shared/interfaces/course-category.model';
import { Status } from 'src/app/shared/interfaces/course-status.model';
import { Course } from 'src/app/shared/interfaces/course.model';
import { CourseBaseComponentComponent } from 'src/app/shared/user/course-base-component/course-base-component.component';
import { ApiCoursesService } from 'src/app/shared/user/user-courses.api.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-user-add-course',
  templateUrl: './user-add-course.component.html',
  styleUrls: ['./user-add-course.component.scss']
})
export class UserAddCourseComponent extends CourseBaseComponentComponent implements OnInit {
  courseForm!: FormGroup;
  courseCategories = Object.keys(CourseCategory).map(key => ({
    key: key,
    value: CourseCategory[key as keyof typeof CourseCategory]
  }))

  constructor(
    private formBuilder: FormBuilder,
    private apiCoursesService: ApiCoursesService,
    private router: Router,
    private userService: UserService,
    snackBar: MatSnackBar,
  ) {
    super(snackBar);
  }

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
      createdBy: [null, Validators.required],
    });

    this.userService.currentUser$.subscribe(user => {
      if (user && user._id) {
        this.courseForm.patchValue({ createdBy: user._id });
      }
    })
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const courseData: Course = {
        ...this.courseForm.value,
        images: this.base64Images
      };

      this.apiCoursesService.addCourse(courseData).subscribe({
        next: () => {
          this.openSnackBar('Kurs został stworzony', 'Zamknij');
          this.router.navigate(['/user/courses']);
          this.courseForm.reset();
        },
        error: (error) => console.error(error),
      });
    }
  }

}
