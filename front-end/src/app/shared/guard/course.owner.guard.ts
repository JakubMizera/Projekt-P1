import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/user/user.service';
import { ApiCoursesService } from 'src/app/shared/user/user-courses.api.service';

@Injectable({
  providedIn: 'root'
})
export class CourseOwnerGuard {
  constructor(
    private userService: UserService,
    private apiCoursesService: ApiCoursesService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const courseId = route.paramMap.get('_id');

    if (!courseId) {
      this.router.navigate(['/']);
      return of(false);
    }

    return this.userService.currentUser$.pipe(
      switchMap(user => {
        if (!user || !user._id) {
          this.router.navigate(['user/unauthorized']);
          return of(false);
        }
        return this.apiCoursesService.getCourseById(courseId).pipe(
          map(course => {
            if (course.createdBy === user._id) {
              return true;
            }
            this.router.navigate(['user/unauthorized']);
            return false;
          }),
          catchError(() => {
            this.router.navigate(['/error']);
            return of(false);
          })
        );
      })
    );
  }
}
