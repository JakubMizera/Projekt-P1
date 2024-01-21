import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsViewComponent } from "./products-view/products-view.component";
import { ProductsDetailsComponent } from "./products-details/products-details.component";

const routes: Routes = [
  {
    path: '',
    component: ProductsViewComponent,
    data: { title: 'Produkty' }
  },
  {
    path: 'details/:id',
    component: ProductsDetailsComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

