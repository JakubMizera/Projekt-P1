import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseCategory } from '../../interfaces/course-category.model';

export class CourseBaseComponent {
  protected base64Images: string[] = [];
  protected imagePreviews: string[] = [];
  protected maxImageSize = 15728640; // ~15mb
  protected hasImageChanged = false;

  courseCategories = Object.keys(CourseCategory).map(key => ({
    key: key,
    value: CourseCategory[key as keyof typeof CourseCategory]
  }))

  constructor(
    protected snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 5000 });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach(file => {
        if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
          this.openSnackBar('Proszę dodać zdjęcie w formacie JPEG lub PNG', 'Zamknij');
          return;
        }

        if (file.size > this.maxImageSize) {
          this.openSnackBar('Plik zbyt duży. Maksymalna wielkość pliku to 15mb', 'Zamknij')
          return;
        }

        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            const base64String = event.target.result as string;
            this.base64Images.push(base64String);
            this.imagePreviews.push(base64String);
            this.hasImageChanged = true;
          }
        };
        reader.readAsDataURL(file); // Convert to base64
      });
    }
  }

  deleteImage(index: number): void {
    if (index >= 0 && index < this.imagePreviews.length) {
      this.imagePreviews.splice(index, 1);
      this.base64Images.splice(index, 1);
      this.hasImageChanged = true;
    }
  }
}
