import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsDetailsComponent } from './products-details/products-details.component';

@NgModule({
  declarations: [
    ProductsViewComponent,
    ProductsDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    ProductsRoutingModule,
    SharedModule,
  ],
  exports: [],
})
export class ProductsModule { }

