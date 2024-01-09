import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./main-page/main-page.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { TermsOfServiceComponent } from "./terms-of-service/terms-of-service.component";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    data: { title: 'Strona Główna' }
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: { title: 'Polityka prywatności' }
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent,
    data: { title: 'Warunki użytkowania' }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }