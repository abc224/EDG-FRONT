import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: false,
})
export class MapComponent implements OnInit {
  private map!: L.Map;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.loadGeoJSON();
  }
  private initMap(): void {
    //this.map = L.map('map').setView([10.5, -10.5], 6); // Centrage sur la Guinée
    this.map = L.map('map').setView([10.5, -10.5], 6.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
  }

  ngAfterViewInit() {
    this.initMap();
    this.loadGeoJSON();
  }

  private loadGeoJSON(): void {
    this.http.get('assets/guinea-regions.json').subscribe((data: any) => {
      L.geoJSON(data, {
        style: () => ({
          color: 'blue',
          weight: 2,
          fillOpacity: 0.2,
        }),
        onEachFeature: (feature, layer) => {
          layer.bindPopup(`Région : ${feature.properties.NAME_1}`);
        },
      }).addTo(this.map);
    });
  }
}
