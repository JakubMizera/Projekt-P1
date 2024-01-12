import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddCourseComponent } from './user-add-course/user-add-course.component';
import { UserContactComponent } from './user-contact/user-contact.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { UserPurchasedComponent } from './user-purchased/user-purchased.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { UserSidePanelComponent } from '../../shared/user/user-side-panel/user-side-panel.component';
import { UserSharedModule } from 'src/app/shared/user/user-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserCoursesEditComponent } from './user-courses-edit/user-courses-edit.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { UserAdminPanelComponent } from './user-admin-panel/user-admin-panel.component';
import { UserPaymentHistoryComponent } from './user-payment-history/user-payment-history.component';

@NgModule({
  declarations: [
    UserAddCourseComponent,
    UserContactComponent,
    UserCoursesComponent,
    UserPurchasedComponent,
    UserSettingsComponent,
    UserSidePanelComponent,
    UserCoursesEditComponent,
    UserPanelComponent,
    UserAdminPanelComponent,
    UserPaymentHistoryComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    UserSharedModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [
    UserAddCourseComponent,
    UserContactComponent,
    UserCoursesComponent,
    UserPurchasedComponent,
    UserSettingsComponent,
    UserCoursesEditComponent,
  ]
})
export class UserModule { }
