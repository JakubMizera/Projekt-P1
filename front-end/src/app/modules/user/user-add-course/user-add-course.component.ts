import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseCategory } from 'src/app/shared/interfaces/course-category.model';
import { Status } from 'src/app/shared/interfaces/course-status.model';
import { Course } from 'src/app/shared/interfaces/course.model';
import { CourseBaseComponent } from 'src/app/shared/user/course-base-component/course-base.component';
import { ApiCoursesService } from 'src/app/shared/user/api-courses.service';
import { UserService } from 'src/app/shared/user/user.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-user-add-course',
  templateUrl: './user-add-course.component.html',
  styleUrls: ['./user-add-course.component.scss']
})
export class UserAddCourseComponent extends CourseBaseComponent implements OnInit, AfterViewInit {
  courseForm!: FormGroup;
  showMap: boolean = false;
  private map!: L.Map;
  selectedLatitude!: number;
  selectedLongitude!: number;
  private courseLocationMarker: L.Marker | null = null;

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
      accountNumber: ['', Validators.required],
      status: Status.Active,
      additionDate: [new Date()],
      expirationDate: [null, Validators.required],
      eventDate: [null, Validators.required],
      eventHour: ['', Validators.required],
      courseCapacity: ['', [Validators.required, Validators.min(1)]],
      category: [CourseCategory.None, Validators.required],
      createdBy: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
    });

    this.userService.currentUser$.subscribe(user => {
      if (user && user._id) {
        this.courseForm.patchValue({ createdBy: user._id });
      }
    })
  }

  ngAfterViewInit(): void {
    this.initMap();
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
          this.router.navigate(['/user/panel']);
          this.courseForm.reset();
        },
        error: (error) => console.error(error),
      });
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.getCurrentLocation()
      .then(location => {
        this.map.setView(location, 13);
        L.marker(location).addTo(this.map)
          .bindPopup('Twoja obecna lokalizacja').openPopup();
      })
      .catch(error => console.error(error));

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const clickedLat = e.latlng.lat;
      const clickedLng = e.latlng.lng;

      if (this.courseLocationMarker) {
        this.courseLocationMarker.setLatLng([clickedLat, clickedLng]);
      } else {
        this.courseLocationMarker = L.marker([clickedLat, clickedLng]).addTo(this.map)
          .bindPopup('Wybrane miejsce kursu');
      }

      this.courseLocationMarker.openPopup();

      this.selectedLatitude = clickedLat;
      this.selectedLongitude = clickedLng;

      this.courseForm.patchValue({
        latitude: this.selectedLatitude,
        longitude: this.selectedLongitude,
      });
    });
  }

  private async getCurrentLocation(): Promise<L.LatLng> {
    if (!navigator.geolocation) {
      throw new Error('Geolokalizacja nie jest wspierana przez Twoją przeglądarkę');
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(new L.LatLng(position.coords.latitude, position.coords.longitude));
      }, () => {
        reject('Nie udało się uzyskać lokalizacji');
      }, {
        enableHighAccuracy: true
      });
    });
  }

}
