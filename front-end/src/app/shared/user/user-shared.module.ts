import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { UserCustomContainerComponent } from './user-custom-container/user-custom-container.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { MaterialModule } from '../material/material.module';
import { UserFormContainer } from './user-form-container/user-form-container.component';

@NgModule({
  declarations: [
    CustomHeaderComponent,
    UserCustomContainerComponent,
    UserHeaderComponent,
    UserFormContainer,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    CustomHeaderComponent,
    UserCustomContainerComponent,
    UserHeaderComponent,
    UserFormContainer,
  ]
})
export class UserSharedModule { }
