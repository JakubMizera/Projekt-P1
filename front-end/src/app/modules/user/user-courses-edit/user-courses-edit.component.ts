import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CourseCategory } from "src/app/shared/interfaces/course-category.model";
import { Course } from "src/app/shared/interfaces/course.model";
import { CourseBaseComponentComponent } from "src/app/shared/user/course-base-component/course-base-component.component";
import { ApiCoursesService } from "src/app/shared/user/user-courses.api.service";

@Component({
  selector: 'app-user-courses-edit',
  templateUrl: './user-courses-edit.component.html',
  styleUrls: ['./user-courses-edit.component.scss']
})
export class UserCoursesEditComponent extends CourseBaseComponentComponent implements OnInit, OnDestroy {
  editCourseForm!: FormGroup;
  routeSubscription!: Subscription;
  courseSubscription!: Subscription;
  hasImageChanged = false;
  id!: string;
  course!: Course;
  courseCategories = Object.keys(CourseCategory).map(key => ({
    key: key,
    value: CourseCategory[key as keyof typeof CourseCategory]
  }))

  constructor(
    private route: ActivatedRoute,
    private apiCoursesService: ApiCoursesService,
    private fb: FormBuilder,
    private router: Router,
    snackBar: MatSnackBar,
  ) {
    super(snackBar);
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = params['_id'];
      this.loadCourse(this.id);
    })
  }

  loadCourse(id: string): void {
    this.courseSubscription = this.apiCoursesService.getCourseById(id).subscribe(course => {
      if (course) {
        this.course = course;
        this.initializeForm();
        this.imagePreviews = course.images || [];
        this.base64Images = [...this.imagePreviews];
      } else {
        throw new Error(`Cannot find course with id = ${id}`);
      }
    })
  }

  initializeForm(): void {
    this.editCourseForm = this.fb.group({
      title: new FormControl(this.course.title, Validators.required),
      description: new FormControl(this.course.description, Validators.required),
      address: new FormControl(this.course.address, Validators.required),
      price: new FormControl(this.course.price, [Validators.required, Validators.min(0)]),
      accountNumber: new FormControl(this.course.accountNumber, Validators.required),
      status: new FormControl(this.course.status, Validators.required),
      expirationDate: new FormControl(this.course.expirationDate, Validators.required),
      category: new FormControl(this.course.category),
    });
  }

  onSubmit(): void {
    if (this.editCourseForm.valid) {
      const updatedCourse: Course = {
        ...this.editCourseForm.value,
        images: this.base64Images,
      };

      this.apiCoursesService.updateCourse(this.id, updatedCourse).subscribe({
        next: () => {
          this.openSnackBar('Zmiany w kursie zostały zapisane', 'Zamknij');
          this.router.navigate(['user/courses']);
        },
        error: (err) => console.error(`Error updating course: ${err}`),
      });
    }
  }

  override onFileSelected(event: Event): void {
    super.onFileSelected(event);
    this.hasImageChanged = true;
  };

  override deleteImage(index: number): void {
    super.deleteImage(index);
    this.hasImageChanged = true;
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }
}
