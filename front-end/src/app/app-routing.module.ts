import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
