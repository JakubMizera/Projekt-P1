import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseCategory } from 'src/app/shared/interfaces/course-category.model';
import { Status } from 'src/app/shared/interfaces/course-status.model';
import { ApiCoursesService } from 'src/app/shared/user/user-courses.api.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-user-add-course',
  templateUrl: './user-add-course.component.html',
  styleUrls: ['./user-add-course.component.scss']
})
export class UserAddCourseComponent implements OnInit {
  courseForm!: FormGroup;
  base64Images: string[] = [];
  imagePreviews: string[] = []; 
  courseCategories = Object.keys(CourseCategory).map(key => ({
    key: key,
    value: CourseCategory[key as keyof typeof CourseCategory]
  }))

  constructor(
    private formBuilder: FormBuilder,
    private apiCoursesService: ApiCoursesService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
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
      // Create a course object including the Base64 images
      const courseData = {
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.base64Images.push(e.target.result);
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file); // Convert to base64
      });
    }
  }

  deleteImage(index: number): void {
    if (index >= 0 && index < this.imagePreviews.length) {
      this.imagePreviews.splice(index, 1);
      this.base64Images.splice(index, 1);
    }
  }

}
