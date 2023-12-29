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

const routes: Routes = [
  {
    path: '',
    component: UserSidePanelComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
      { path: 'courses', component: UserCoursesComponent },
      { path: 'courses/:_id/edit', component: UserCoursesEditComponent },
      { path: 'purchased', component: UserPurchasedComponent },
      { path: 'settings', component: UserSettingsComponent },
      { path: 'addcourse', component: UserAddCourseComponent },
      { path: 'contact', component: UserContactComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
