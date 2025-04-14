import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrl: './interactive-map.component.css',
})
export class InteractiveMapComponent implements OnInit {
  private map!: L.Map;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.initMap();
    this.loadGeoJSON();
  }

  ngAfterViewInit() {
    this.initMap();
    this.loadGeoJSON();
  }
  private coveredArea: L.LatLngTuple[] = [
    [9.641, -13.578],
    [9.642, -13.573],
    [9.646, -13.575],
    [9.644, -13.58],
    [9.641, -13.578],
  ];

  private uncoveredArea: L.LatLngTuple[] = [
    [9.66, -13.6],
    [9.665, -13.595],
    [9.67, -13.598],
    [9.667, -13.605],
    [9.66, -13.6],
  ];

  customIcon = L.icon({
    iconUrl: '/assets/images/marker-icon.png',
    shadowUrl: '/assets/images/marker-shadow.png',
    iconSize: [25, 41], // Taille de l'icône
    iconAnchor: [12, 41], // Point d’ancrage (où l'icône touche le sol)
    popupAnchor: [1, -34], // Position du popup par rapport à l'icône
    shadowSize: [41, 41], // Taille de l’ombre
  });

  private coverageAreas: {
    city: string;
    covered: { name: string; coordinates: L.LatLngTuple[] }[];
    uncovered: { name: string; coordinates: L.LatLngTuple[] }[];
  }[] = [
    {
      city: 'Kindia',
      covered: [
        {
          name: 'Quartier A',
          coordinates: [
            [10.05, -12.86],
            [10.06, -12.85],
            [10.07, -12.87],
            [10.06, -12.88],
            [10.05, -12.86],
          ],
        },
        {
          name: 'Quartier B',
          coordinates: [
            [10.08, -12.84],
            [10.09, -12.83],
            [10.1, -12.85],
            [10.09, -12.86],
            [10.08, -12.84],
          ],
        },
        {
          name: 'Quartier C',
          coordinates: [
            [10.03, -12.8],
            [10.04, -12.79],
            [10.05, -12.81],
            [10.04, -12.82],
            [10.03, -12.8],
          ],
        },
        {
          name: 'Quartier D',
          coordinates: [
            [10.12, -12.87],
            [10.13, -12.86],
            [10.14, -12.88],
            [10.13, -12.89],
            [10.12, -12.87],
          ],
        },
        {
          name: 'Quartier E',
          coordinates: [
            [10.07, -12.9],
            [10.08, -12.89],
            [10.09, -12.91],
            [10.08, -12.92],
            [10.07, -12.9],
          ],
        },
      ],
      uncovered: [
        {
          name: 'Zone industrielle',
          coordinates: [
            [10.02, -12.89],
            [10.03, -12.88],
            [10.04, -12.9],
            [10.03, -12.91],
            [10.02, -12.89],
          ],
        },
        {
          name: 'Marché central',
          coordinates: [
            [10.06, -12.92],
            [10.07, -12.91],
            [10.08, -12.93],
            [10.07, -12.94],
            [10.06, -12.92],
          ],
        },
      ],
    },
    {
      city: 'Conakry',
      covered: [
        {
          name: 'Ratoma',
          coordinates: [
            [9.65, -13.58],
            [9.66, -13.57],
            [9.67, -13.59],
            [9.66, -13.6],
            [9.65, -13.58],
          ],
        },
        {
          name: 'Matoto',
          coordinates: [
            [9.6, -13.6],
            [9.61, -13.59],
            [9.62, -13.61],
            [9.61, -13.62],
            [9.6, -13.6],
          ],
        },
      ],
      uncovered: [
        {
          name: 'Marché Madina',
          coordinates: [
            [9.62, -13.58],
            [9.63, -13.57],
            [9.64, -13.59],
            [9.63, -13.6],
            [9.62, -13.58],
          ],
        },
        {
          name: 'Kassa',
          coordinates: [
            [9.5, -13.7],
            [9.51, -13.69],
            [9.52, -13.71],
            [9.51, -13.72],
            [9.5, -13.7],
          ],
        },
      ],
    },
    {
      city: 'Kankan',
      covered: [
        {
          name: 'Quartier Farako',
          coordinates: [
            [10.38, -9.3],
            [10.39, -9.29],
            [10.4, -9.31],
            [10.39, -9.32],
            [10.38, -9.3],
          ],
        },
        {
          name: 'Quartier Salamani',
          coordinates: [
            [10.36, -9.28],
            [10.37, -9.27],
            [10.38, -9.29],
            [10.37, -9.3],
            [10.36, -9.28],
          ],
        },
      ],
      uncovered: [
        {
          name: 'Marché central de Kankan',
          coordinates: [
            [10.35, -9.33],
            [10.36, -9.32],
            [10.37, -9.34],
            [10.36, -9.35],
            [10.35, -9.33],
          ],
        },
        {
          name: 'Zone rurale',
          coordinates: [
            [10.3, -9.4],
            [10.31, -9.39],
            [10.32, -9.41],
            [10.31, -9.42],
            [10.3, -9.4],
          ],
        },
      ],
    },
  ];

  private cities: { name: string; coords: L.LatLngTuple }[] = [
    { name: 'Conakry', coords: [9.6412, -13.5784] },
    { name: 'Kankan', coords: [10.3852, -9.3057] },
    { name: 'Kindia', coords: [10.0564, -12.8658] },
    { name: 'Labé', coords: [11.3181, -12.2833] },
    { name: 'Nzérékoré', coords: [7.7569, -8.8176] },
    { name: 'Boké', coords: [10.9391, -14.2905] },
    { name: 'Mamou', coords: [10.3755, -12.0911] },
    { name: 'Faranah', coords: [10.0404, -10.7433] },
    { name: 'Kissidougou', coords: [9.186, -10.0999] },
    { name: 'Dabola', coords: [10.7491, -11.1107] },
  ];

  private markers = [
    { lat: 9.641, lng: -13.578, label: 'Station 1' },
    { lat: 9.65, lng: -13.59, label: 'Transformateur 1' },
  ];

  // private initMap(): void {
  //   //this.map = L.map('map').setView([10.5, -10.5], 6); // Centrage sur la Guinée
  //   this.map = L.map('map').setView([10.5, -10.5], 6.5);
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; OpenStreetMap contributors',
  //   }).addTo(this.map);
  // }

  private initMap(): void {
    this.map = L.map('map').setView([10.5, -10.5], 6.5);
    // this.map = L.map('map').setView([9.641, -13.578], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Ajouter les zones
    L.polygon(this.coveredArea, { color: 'green' })
      .addTo(this.map)
      .bindPopup('Zone couverte');
    L.polygon(this.uncoveredArea, { color: 'red' })
      .addTo(this.map)
      .bindPopup('Zone non couverte');

    // Ajouter des marqueurs
    this.markers.forEach((m) => {
      L.marker([m.lat, m.lng]).addTo(this.map).bindPopup(m.label);
    });

    this.cities.forEach((city) => {
      L.marker(city.coords, { icon: this.customIcon })
        .addTo(this.map)
        .bindPopup(`<b>${city.name}</b>`);
    });
    this.coverageAreas.forEach((area) => {
      // Zones couvertes
      area.covered.forEach((zone) => {
        L.polygon(zone.coordinates, { color: 'green', fillOpacity: 0.3 })
          .addTo(this.map)
          .bindPopup(`<b>${area.city} - ${zone.name}</b><br>Zone couverte`);
      });

      // Zones non couvertes
      area.uncovered.forEach((zone) => {
        L.polygon(zone.coordinates, { color: 'red', fillOpacity: 0.3 })
          .addTo(this.map)
          .bindPopup(`<b>${area.city} - ${zone.name}</b><br>Zone non couverte`);
      });
    });
  }

  private loadGeoJSON(): void {
    this.http.get('assets/guinea.json').subscribe((data: any) => {
      L.geoJSON(data, {
        style: () => ({
          color: 'green',
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
