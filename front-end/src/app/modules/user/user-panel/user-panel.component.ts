import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/shared/interfaces/course.model';
import { Status } from 'src/app/shared/interfaces/course-status.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/shared/user/user.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/material/confimation-dialog/confirmation-dialog.component';
import { ApiUserCoursesService } from 'src/app/shared/user/api-user-courses.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'price', 'options'];
  dataSource!: MatTableDataSource<Course>;
  Status = Status;
  userId!: string;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private apiUserCoursesService: ApiUserCoursesService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      if (user && user._id) {
        this.apiUserCoursesService.getUserCourses(user._id);
        this.userId = user._id;
      }
    });

    this.apiUserCoursesService.userCourses$.subscribe(courses => {
      this.dataSource = new MatTableDataSource(courses);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToCourseEdit(id: string): void {
    this.router.navigate(['user/courses', id, 'edit']);
  }

  deleteCourse(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.apiUserCoursesService.deleteUserCourse(id, this.userId).subscribe()
      }
    })
  }
}