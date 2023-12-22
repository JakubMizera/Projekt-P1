import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { UserCustomContainerComponent } from './user-custom-container/user-custom-container.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    CustomHeaderComponent,
    UserCustomContainerComponent,
    UserHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    CustomHeaderComponent,
    UserCustomContainerComponent,
    UserHeaderComponent,
  ]
})
export class UserSharedModule { }
