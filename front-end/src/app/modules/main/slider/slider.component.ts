import { Component, AfterViewInit, ElementRef } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit {
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    new Splide(this.elRef.nativeElement.querySelector('.splide'), {
      perPage: 5,
      type: 'loop',
      autoplay: true,
      interval: 4000,
      cover: true,
      height: '10rem',
      focus: 'center',
      breakpoints: {
        768: {
          height: '6rem',
        },
      },
    }).mount();

  }
}
