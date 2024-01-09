import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MainRoutingModule } from './main-routing.module';
import { MapComponent } from './map/map.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SliderComponent } from './slider/slider.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MainPageComponent,
    MapComponent,
    OurServicesComponent,
    SearchBarComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ],
  exports: [
    MainPageComponent,
    MapComponent,
    OurServicesComponent,
    SearchBarComponent,
    SliderComponent,
  ]
})
export class MainModule { }
