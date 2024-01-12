import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCustomContainerComponent } from './user-custom-container/user-custom-container.component';
import { MaterialModule } from '../material/material.module';
import { UserFormContainer } from './user-form-container/user-form-container.component';
import { UserUnauthorizedComponent } from './user-unauthorized/user-unauthorized.component';

@NgModule({
  declarations: [
    UserCustomContainerComponent,
    UserFormContainer,
    UserUnauthorizedComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    UserCustomContainerComponent,
    UserFormContainer,
  ]
})
export class UserSharedModule { }
