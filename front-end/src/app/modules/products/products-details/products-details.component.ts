import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/interfaces/course.model';
import { ApiCoursesService } from 'src/app/shared/user/api-courses.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  product_id!: string;
  product!: Course;

  constructor(
    private route: ActivatedRoute,
    private apiCoursesService: ApiCoursesService,
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.product_id = params['id'];
      console.log(this.product_id)
      this.apiCoursesService.getCourseById(this.product_id).subscribe(res => {
      this.product = res
      })
  })
  }
}
