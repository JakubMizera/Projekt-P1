import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/shared/interfaces/course.model';
import { User } from 'src/app/shared/interfaces/user.model';
import { ApiCoursesService } from 'src/app/shared/user/api-courses.service';
import { CourseBaseComponent } from 'src/app/shared/user/course-base-component/course-base.component';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent extends CourseBaseComponent implements OnInit, AfterViewInit {
  routeSubscription!: Subscription;
  course!: Course;
  courseId!: string;
  userId!: string;
  isEnrolled: boolean = false;
  reservedSpotsCount!: number;
  isCourseOwner: boolean = false;
  reservedUsers: User[] = [];

  constructor(
    private apiCoursesService: ApiCoursesService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    snackBar: MatSnackBar,
  ) {
    super(snackBar);
    this.allowMapClickToUpdateLocation = false;
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.courseId = params['id'];
    })

    this.userService.currentUser$.subscribe((user) => {
      if (user && user._id) {
        this.userId = user._id
      }
    })

    this.apiCoursesService.getCourseById(this.courseId).subscribe((courseData) => {
      this.course = courseData;

      this.reservedSpotsCount = this.course.reservedUserIds ? this.course.reservedUserIds.length : 0;
      this.isFullyBooked();

      if (this.userId === this.course.createdBy) {
        this.isCourseOwner = true;
      }

      this.userService.getReservedUsers(this.courseId).subscribe((users) => {
        this.reservedUsers = users;
      })

      this.apiCoursesService.isUserEnrolled(this.courseId, this.userId).subscribe(isEnrolled => {
        this.isEnrolled = isEnrolled;
      })
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
      if (this.course.latitude && this.course.longitude) {
        this.updateMarkerLocation(this.course.latitude, this.course.longitude);
        this.setupCurrentLocationMarker(this.course.latitude, this.course.longitude);
      }
    }, 200);
  }

  reserveCourse(): void {
    if (this.userId) {
      console.log(this.userId);
      this.apiCoursesService.reserveCourse(this.courseId, this.userId).subscribe(({
        next: () => {
          this.reservedSpotsCount++;
          this.isFullyBooked();
          this.openSnackBar('Zostałeś zapisany na kurs', 'Zamknij');
        },
        error: (err) => console.error(err),
      }))
    } else {
      this.router.navigate(['/login']);
      this.openSnackBar('Aby zarezerwować kurs należy się zalogować', 'Zamknij');
    }
  }

  unreserveCourse(): void {
    this.apiCoursesService.unreserveCourse(this.courseId, this.userId).subscribe(({
      next: () => {
        this.reservedSpotsCount--;
        this.isFullyBooked();
        this.openSnackBar('Zostałeś wypisany z kursu', 'Zamknij');
      },
      error: (err) => console.error(err),
    }))
  }

  toggleCourseReservation(): void {
    if (this.isEnrolled) {
      this.unreserveCourse();
      this.isEnrolled = false;
    } else {
      this.reserveCourse();
      this.isEnrolled = true;
    }
  }

  isFullyBooked(): boolean {
    if (this.course && this.course.reservedUserIds && typeof this.course.courseCapacity === 'number') {
      return this.course.reservedUserIds.length >= this.course.courseCapacity;
    }
    return false;
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
