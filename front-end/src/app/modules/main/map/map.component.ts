import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'src/app/shared/interfaces/course.model';
import { ApiCoursesService } from 'src/app/shared/user/api-courses.service';
import { CourseBaseComponent } from 'src/app/shared/user/course-base-component/course-base.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends CourseBaseComponent implements OnInit, AfterViewInit {
  courses!: Course[];
  override allowMapClickToUpdateLocation = false;

  constructor(
    private apiCoursesService: ApiCoursesService,
    snackBar: MatSnackBar
  ) {
    super(snackBar)
  }

  ngOnInit(): void {
    this.initMap();
    this.apiCoursesService.courses$.subscribe(courses => {
      this.courses = courses;
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showCoursesOnMap(this.courses);
    }, 100);
  }

  private showCoursesOnMap(courses: Course[]): void {
    courses.forEach(course => {
      if (course.latitude && course.longitude) {
        const marker = L.marker([course.latitude, course.longitude]).addTo(this.map);
        marker.bindPopup(`Kurs: ${course.title}`);
      }
    })
  }

}
