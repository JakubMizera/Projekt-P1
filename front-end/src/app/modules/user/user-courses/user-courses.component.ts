import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Status } from 'src/app/shared/interfaces/course-status.model';
import { Course } from 'src/app/shared/interfaces/course.model';
import { ApiCoursesService } from 'src/app/shared/user/user-courses.api.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'status', 'price', 'options'];
  dataSource!: MatTableDataSource<Course>;
  private subscription!: Subscription;
  Status = Status;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private apiCoursesService: ApiCoursesService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.apiCoursesService.courses$.subscribe(courses => {
      this.dataSource = new MatTableDataSource(courses);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToCourseEdit(id: string): void {
    this.router.navigate(['user/courses', id]);
  }

}
