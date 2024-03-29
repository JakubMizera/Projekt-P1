import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from "./about-us/about-us.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent,
    data: { title: 'O nas' }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }