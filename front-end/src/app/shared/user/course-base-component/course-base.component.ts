import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseCategory } from '../../interfaces/course-category.model';

export class CourseBaseComponent {
  protected base64Images: string[] = [];
  protected imagePreviews: string[] = [];

  courseCategories = Object.keys(CourseCategory).map(key => ({
    key: key,
    value: CourseCategory[key as keyof typeof CourseCategory]
  }))

  constructor(
    protected snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
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
