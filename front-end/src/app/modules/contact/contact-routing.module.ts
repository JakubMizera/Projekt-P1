import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./contact-page/contact.component";

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    data: { title: 'Kontakt' }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }