import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseCategory } from 'src/app/shared/interfaces/course-category.model';
import { Course } from 'src/app/shared/interfaces/course.model';
import { ApiCoursesService } from 'src/app/shared/user/api-courses.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  selectedCategory: string = 'All';
  courseCategories = Object.keys(CourseCategory).map(key => ({
    key: key,
    value: CourseCategory[key as keyof typeof CourseCategory]
  }));

  constructor(
    private router: Router,
    private apiCoursesService: ApiCoursesService,
  ) { }

  ngOnInit(): void {
    this.apiCoursesService.courses$.subscribe(courses => {
      this.courses = courses;
      this.applyCategoryFilter();
    })
  }

  applyCategoryFilter(): void {
    if (this.selectedCategory === 'All') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter(course => course.category === this.selectedCategory);
    }
  }

}
