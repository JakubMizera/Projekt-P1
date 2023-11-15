import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddCourseComponent } from './user-add-course/user-add-course.component';
import { UserContactComponent } from './user-contact/user-contact.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserPaymentHistoryComponent } from './user-payment-history/user-payment-history.component';
import { UserPurchasedComponent } from './user-purchased/user-purchased.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { UserSidePanelComponent } from './user-side-panel/user-side-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    UserAddCourseComponent,
    UserContactComponent,
    UserCoursesComponent,
    UserHeaderComponent,
    UserPaymentHistoryComponent,
    UserPurchasedComponent,
    UserSettingsComponent,
    UserViewComponent,
    UserSidePanelComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    UserAddCourseComponent,
    UserContactComponent,
    UserCoursesComponent,
    UserHeaderComponent,
    UserPaymentHistoryComponent,
    UserPurchasedComponent,
    UserSettingsComponent,
    UserViewComponent,
  ]
})
export class UserModule { }
