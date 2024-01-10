import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const accessRole = route.data['accessRole'];

    return this.userService.currentUser$.pipe(
      map(currentUser => {
        if (currentUser && currentUser.role === accessRole) {
          return true;
        } else {
          this.router.navigate(['user/unauthorized']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['user/unauthorized']);
        return of(false);
      })
    )
  }

}