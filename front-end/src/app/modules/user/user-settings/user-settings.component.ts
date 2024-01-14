import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/interfaces/user.model';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  userForm!: FormGroup;
  currentUser: User | null = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;

      if (user) {
        this.userForm = this.formBuilder.group({
          displayName: new FormControl(this.currentUser?.displayName, Validators.required),
          name: new FormControl(this.currentUser?.name, Validators.required),
          surname: new FormControl(this.currentUser?.surname, Validators.required),
          phoneNumber: new FormControl(this.currentUser?.phoneNumber,
            [Validators.required]),
        });
      }
    });
  }

  saveUserSettings(): void {
    if (this.userForm.valid) {
      const updatedUserData: Partial<User> = {
        ...this.userForm.value
      };

      this.userService.updateCurrentUser(updatedUserData as User).subscribe({
        next: () => {
          this.openSnackBar('Ustawienia zostały zapisane', 'Zamknij');
        },
        error: (error) => {
          console.error('Error updating user settings', error);
        }
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
