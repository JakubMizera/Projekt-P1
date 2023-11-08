import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutUsComponent,
    EventsComponent,
    ContactComponent,
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
