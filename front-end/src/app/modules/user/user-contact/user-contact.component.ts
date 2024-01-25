import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/shared/contact/contact.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.component.html',
  styleUrls: ['./user-contact.component.scss']
})
export class UserContactComponent implements OnInit {
  contactForm!: FormGroup;
  userName!: string;
  userEmail!: string;

  constructor(
    private contactService: ContactService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }


  ngOnInit(): void {
    // Subcribe for user name and email
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.userName = user.displayName;
        this.userEmail = user.email;
      } else {
        this.router.navigate(['/login']);
      }
    })

    this.contactForm = this.formBuilder.group({
      name: new FormControl(this.userName),
      email: new FormControl(this.userEmail),
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value).subscribe({
        next: () => {
          this.openSnackBar('Wiadomość została wysłana', 'Zamknij')
          this.contactForm.reset();
          // Reset form validation errors
          Object.keys(this.contactForm.controls).forEach(key => {
            this.contactForm.get(key)?.setErrors(null);
          })
        },
        error: (error) => console.error(error),
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }

}
