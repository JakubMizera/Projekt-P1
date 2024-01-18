import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseCategory } from '../../interfaces/course-category.model';
import * as L from 'leaflet';

export class CourseBaseComponent {
  protected base64Images: string[] = [];
  protected imagePreviews: string[] = [];
  protected maxImageSize = 15728640; // ~15mb
  protected hasImageChanged = false;
  protected map!: L.Map;
  protected selectedLatitude!: number;
  protected selectedLongitude!: number;
  protected courseLocationMarker: L.Marker | null = null;

  courseCategories = Object.keys(CourseCategory).map(key => ({
    key: key,
    value: CourseCategory[key as keyof typeof CourseCategory]
  }))

  constructor(
    protected snackBar: MatSnackBar
  ) { }

  protected openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 5000 });
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach(file => {
        if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
          this.openSnackBar('Proszę dodać zdjęcie w formacie JPEG lub PNG', 'Zamknij');
          return;
        }

        if (file.size > this.maxImageSize) {
          this.openSnackBar('Plik zbyt duży. Maksymalna wielkość pliku to 15mb', 'Zamknij')
          return;
        }

        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            const base64String = event.target.result as string;
            this.base64Images.push(base64String);
            this.imagePreviews.push(base64String);
            this.hasImageChanged = true;
          }
        };
        reader.readAsDataURL(file); // Convert to base64
      });
    }
  }

  protected deleteImage(index: number): void {
    if (index >= 0 && index < this.imagePreviews.length) {
      this.imagePreviews.splice(index, 1);
      this.base64Images.splice(index, 1);
      this.hasImageChanged = true;
    }
  }

  protected initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.setupMapClickEvent();
    this.setupCurrentLocationMarker();
  }

  private setupMapClickEvent(): void {
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const clickedLat = e.latlng.lat;
      const clickedLng = e.latlng.lng;

      this.updateMarkerLocation(clickedLat, clickedLng);
      this.onMapClick(clickedLat, clickedLng);
    });
  }

  private updateMarkerLocation(lat: number, lng: number): void {
    if (this.courseLocationMarker) {
      this.courseLocationMarker.setLatLng([lat, lng]);
    } else {
      this.courseLocationMarker = L.marker([lat, lng]).addTo(this.map)
        .bindPopup('Wybrane miejsce kursu');
    }
    this.courseLocationMarker.openPopup();

    this.selectedLatitude = lat;
    this.selectedLongitude = lng;
  }

  private setupCurrentLocationMarker(): void {
    this.getCurrentLocation()
      .then(location => {
        this.map.setView(location, 13);
        L.marker(location).addTo(this.map)
          .bindPopup('Twoja obecna lokalizacja').openPopup();
      })
      .catch(error => console.error(error));
  }

  protected onMapClick(lat: number, lng: number): void {
  }

  private async getCurrentLocation(): Promise<L.LatLng> {
    if (!navigator.geolocation) {
      throw new Error('Geolokalizacja nie jest wspierana przez Twoją przeglądarkę');
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(new L.LatLng(position.coords.latitude, position.coords.longitude));
      }, () => {
        reject('Nie udało się uzyskać lokalizacji');
      }, {
        enableHighAccuracy: true
      });
    });
  }

}
