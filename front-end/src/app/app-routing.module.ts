import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { UserPurchasedComponent } from './user-purchased/user-purchased.component';
import { UserPaymentHistoryComponent } from './user-payment-history/user-payment-history.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserAddCourseComponent } from './user-add-course/user-add-course.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { UserContactComponent } from './user-contact/user-contact.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path:'about', component: AboutUsComponent},
  {path:'events', component: EventsComponent},
  {path:'contact', component: ContactComponent},
  {path:'user', component: SidePanelComponent, children: [
    {path:'', component: UserViewComponent},
    {path:'courses', component: UserCoursesComponent},
    {path:'purchased', component: UserPurchasedComponent},
    {path:'payment', component: UserPaymentHistoryComponent},
    {path:'settings', component: UserSettingsComponent},
    {path:'createcourse', component: UserAddCourseComponent},
    {path:'contact', component: UserContactComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
