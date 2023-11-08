import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MainRoutingModule } from './main-routing.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MapComponent } from './map/map.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ContactUsComponent,
    MapComponent,
    OurServicesComponent,
    SearchBarComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
  exports: [
    MainPageComponent,
    ContactUsComponent,
    MapComponent,
    OurServicesComponent,
    SearchBarComponent,
    SliderComponent,
  ]
})
export class MainModule { }
