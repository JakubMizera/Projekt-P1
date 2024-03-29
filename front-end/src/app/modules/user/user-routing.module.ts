import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { UserCoursesComponent } from "./user-courses/user-courses.component";
import { UserPurchasedComponent } from "./user-purchased/user-purchased.component";
import { UserSettingsComponent } from "./user-settings/user-settings.component";
import { UserAddCourseComponent } from "./user-add-course/user-add-course.component";
import { UserContactComponent } from "./user-contact/user-contact.component";
import { UserSidePanelComponent } from "../../shared/user/user-side-panel/user-side-panel.component";
import { UserCoursesEditComponent } from "./user-courses-edit/user-courses-edit.component";
import { AuthGuard } from "src/app/shared/guard/auth.login.guard";
import { CourseOwnerGuard } from "src/app/shared/guard/course.owner.guard";
import { UserUnauthorizedComponent } from "src/app/shared/user/user-unauthorized/user-unauthorized.component";
import { UserPanelComponent } from "./user-panel/user-panel.component";
import { UserAdminPanelComponent } from "./user-admin-panel/user-admin-panel.component";
import { RoleGuard } from "src/app/shared/guard/role.guard";
import { UserRole } from "src/app/shared/interfaces/user-role.model";
import { UserCourseDetailsComponent } from "./user-course-details/user-course-details.component";

const routes: Routes = [
  {
    path: '',
    component: UserSidePanelComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'panel', pathMatch: 'full' },
      {
        path: 'panel',
        component: UserPanelComponent,
        data: { title: 'Panel użytkownika' }
      },
      {
        path: 'admin-panel',
        component: UserAdminPanelComponent,
        canActivate: [RoleGuard],
        data: { title: 'Panel administatora', accessRole: UserRole.Admin }
      },
      {
        path: 'courses',
        component: UserCoursesComponent,
        data: { title: 'Kursy' }
      },
      {
        path: 'courses/:_id/details',
        component: UserCourseDetailsComponent,
        data: { title: 'Szczegóły kursu' }
      },
      {
        path: 'courses/:_id/edit',
        component: UserCoursesEditComponent,
        data: { title: 'Edycja kursu' },
        canActivate: [CourseOwnerGuard]
      },
      {
        path: 'settings',
        component: UserSettingsComponent,
        data: { title: 'Ustawienia' }
      },
      {
        path: 'addcourse',
        component: UserAddCourseComponent,
        data: { title: 'Dodaj kurs' }
      },
      {
        path: 'contact',
        component: UserContactComponent
        , data: { title: 'Kontakt' }
      },
      {
        path: 'unauthorized',
        component: UserUnauthorizedComponent,
        data: { title: 'Nieautoryzowany' }
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
