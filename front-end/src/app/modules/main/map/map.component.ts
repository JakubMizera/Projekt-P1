import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map!: L.Map;

  ngOnInit(): void {
    this.initMap();
    this.getCurrentLocation()
      .then(location => this.showLocationOnMap(location))
      .catch(error => console.error(error));
  }

  private initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private getCurrentLocation(): Promise<L.LatLng> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolokalizacja nie jest wspierana przez Twoją przeglądarkę');
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          resolve(new L.LatLng(position.coords.latitude, position.coords.longitude));
        }, () => {
          reject('Nie udało się uzyskać lokalizacji');
        });
      }
    });
  }

  private showLocationOnMap(location: L.LatLng): void {
    L.marker(location).addTo(this.map)
      .bindPopup('Twoja obecna lokalizacja').openPopup();

    this.map.setView(location, 13);
  }

}
navigator.geolocation.getCurrentPosition(position => {
  // ...
}, error => {
  // Obsługa błędów
}, {
  enableHighAccuracy: true
});

