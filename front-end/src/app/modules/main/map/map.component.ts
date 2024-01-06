import { Component, OnInit } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  ngOnInit() {
    this.initMap();
  }

  initMap(): void {
    const uluru = { lat: -25.344, lng: 131.036 }; // Zastąp współrzędnymi
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      zoom: 4,
      center: uluru,
    });

    new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }
}
