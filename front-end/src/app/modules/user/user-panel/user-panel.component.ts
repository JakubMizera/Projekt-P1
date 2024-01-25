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
import { ApiCoursesService } from 'src/app/shared/user/api-courses.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  displayedColumns: string[] = [
    'title', 'status', 'price', 'eventDate',
    'courseCapacity', 'category', 'address', 'options'
  ];
  dataSource!: MatTableDataSource<Course>;
  Status = Status;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private apiCoursesService: ApiCoursesService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      if (user && user._id) {
        this.apiCoursesService.getUserCourses(user._id).subscribe(courses => {
          this.dataSource = new MatTableDataSource(courses);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      }
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToCourseDetail(id: string): void {
    this.router.navigate(['user/courses', id, 'details']);
  }

  navigateToCourseEdit(id: string): void {
    this.router.navigate(['user/courses', id, 'edit']);
  }

  deleteCourse(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.apiCoursesService.deleteCourse(id).subscribe()
      }
    })
  }
}
