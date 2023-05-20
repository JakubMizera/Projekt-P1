import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MainPageComponent } from './main-page/main-page.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SliderComponent } from './slider/slider.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { UserPaymentHistoryComponent } from './user-payment-history/user-payment-history.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserPurchasedComponent } from './user-purchased/user-purchased.component';
import { UserAddCourseComponent } from './user-add-course/user-add-course.component';
import { UserContactComponent } from './user-contact/user-contact.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { MapComponent } from './map/map.component';
import { OurServicesComponent } from './our-services/our-services.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchBarComponent,
    AboutUsComponent,
    MainPageComponent,
    EventsComponent,
    ContactComponent,
    SliderComponent,
    SidePanelComponent,
    UserViewComponent,
    UserCoursesComponent,
    UserPaymentHistoryComponent,
    UserSettingsComponent,
    UserPurchasedComponent,
    UserAddCourseComponent,
    UserContactComponent,
    UserHeaderComponent,
    MapComponent,
    OurServicesComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      SlickCarouselModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
