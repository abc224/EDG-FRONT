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
  private regionColors: { [key: string]: string } = {
    Conakry: '#FF5733',
    Kindia: '#33FF57',
    Boké: '#1ABC9C',
    Labé: '#FF33A1',
    Mamou: '#FFD633',
    Faranah: '#8E44AD',
    Kankan: '#3357FF',
    Nzérékoré: '#FF8C00',
  };
  private loadGeoJSON(): void {
    this.http.get('assets/guinea-regions.json').subscribe((data: any) => {
      L.geoJSON(data, {
        style: (feature) => ({
          color: 'black',
          weight: 1,
          fillColor: this.regionColors[feature!.properties.NAME_1] || '#cccccc',
          fillOpacity: 0.7,
        }),
        onEachFeature: (feature, layer) => {
          layer.bindPopup(`Région : ${feature.properties.NAME_1}`);
        },
      }).addTo(this.map);
    });
    this.addLegend();
  }

  private addLegend(): void {
    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML += '<strong>Régions</strong><br>';

      for (const region in this.regionColors) {
        const color = this.regionColors[region];
        div.innerHTML += `
          <div style="margin-bottom: 4px;">
            <i style="background:${color}; width: 14px; height: 14px; display: inline-block; margin-right: 6px; border: 1px solid #999;"></i>
            ${region}
          </div>`;
      }

      return div;
    };

    legend.addTo(this.map);
  }
}
