import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCustomContainerComponent } from './user-custom-container/user-custom-container.component';
import { MaterialModule } from '../material/material.module';
import { UserFormContainer } from './user-form-container/user-form-container.component';
import { UserUnauthorizedComponent } from './user-unauthorized/user-unauthorized.component';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';

@NgModule({
  declarations: [
    UserCustomContainerComponent,
    UserFormContainer,
    UserUnauthorizedComponent,
    UserCalendarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    UserCustomContainerComponent,
    UserFormContainer,
    UserCalendarComponent,
  ]
})
export class UserSharedModule { }
