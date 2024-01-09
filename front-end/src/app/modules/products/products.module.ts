import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserSharedModule } from 'src/app/shared/user/user-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductsViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserSharedModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    ProductsRoutingModule,
    SharedModule,
  ],
  exports: [],
})
export class ProductsModule { }

