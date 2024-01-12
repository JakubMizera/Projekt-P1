import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/interfaces/course.model';
import { ApiCoursesService } from 'src/app/shared/user/api-courses.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private apiCoursesService: ApiCoursesService,
  ) { }

  ngOnInit(): void {
    this.apiCoursesService.courses$.subscribe(courses => {
      this.courses = courses;
    })
  }

}
