import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as L from 'leaflet';
import { RegionService } from '../../services/region.service';
import { Region } from '../../models/region';
import { ZoneService } from '../../services/zone.service';
import { Zone } from '../../models/zone';
import { ToastrService } from 'ngx-toastr';
import { Prefecture } from '../../models/prefecture';
import { PrefectureService } from '../../services/prefecture.service';
import { SousPrefecture } from '../../models/sousPrefecture';
import { Quartier } from '../../models/quartier';
import { SousPrefectureService } from '../../services/sous-prefecture.service';
declare var bootstrap: any;
@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrl: './interactive-map.component.css',
})
export class InteractiveMapComponent implements OnInit {
  selectedRegion = '';
  selectedPrefecture = '';
  selectedSousPrefecture = '';
  selectedLatitude = 0;
  selectedLongitude = 0;
  electrificationStatus: boolean = false;
  private map!: L.Map;
  filterTerm: any;
  filterFormGroup!: FormGroup;
  regions!: Region[];
  zones!: Zone[];
  filteredPrefectures: Prefecture[] = [];
  filteredSousPrefectures: SousPrefecture[] = [];
  filteredQuartiers: Quartier[] = [];
  constructor(
    private http: HttpClient,
    private regionService: RegionService,
    private prefectureService: PrefectureService,
    private zoneService: ZoneService,
    private toast: ToastrService,
    private formBuider: FormBuilder,
    private sousPrefectureService: SousPrefectureService
  ) {
    this.filterFormGroup = this.formBuider.group({
      region: [''],
      prefecture: [''],
      sousPrefecture: [''],
      zone: [''],
    });
  }
  ngOnInit(): void {
    this.getAllZone();
    this.initMap();
    this.loadGeoJSON();
    this.getAllRegions();
    this.filterPrefectures();
    this.filterSousPrefectures();
    this.filterQuartiers();
  }

  ngAfterViewInit() {
    this.initMap();
    this.loadGeoJSON();
    this.getAllRegions();
  }

  greenIcon = L.icon({
    iconUrl: 'assets/images/marker-icon-2x-green.png',
    iconSize: [15, 25],
    iconAnchor: [12, 25],
    popupAnchor: [1, -34],
    shadowUrl: 'assets/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  redIcon = L.icon({
    iconUrl: 'assets/images/marker-icon-2x-red.png',
    iconSize: [15, 25],
    iconAnchor: [12, 25],
    popupAnchor: [1, -34],
    shadowUrl: 'assets/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  private cities: {
    name: string;
    coords: L.LatLngTuple;
    electrified: boolean;
  }[] = [];

  private initMap(): void {
    this.map = L.map('map').setView([10.5, -10.5], 6.5);
    // this.map = L.map('map').setView([9.641, -13.578], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.cities.forEach((city) => {
      L.marker(city.coords, {
        icon: city.electrified ? this.greenIcon : this.redIcon,
      })
        .addTo(this.map)
        .bindPopup(`<b>${city.name}</b>`);
    });
  }

  private loadGeoJSON(): void {
    this.http.get('assets/guinea.json').subscribe((data: any) => {
      L.geoJSON(data, {
        style: () => ({
          color: 'yellow',
          weight: 1.5,
          fillOpacity: 0.3,
          fillColor: 'black',
        }),
        // onEachFeature: (feature, layer) => {
        //   layer.bindPopup(`Région : ${feature.properties.NAME_1}`);
        // },
        onEachFeature: (feature, layer) => {
          layer.on('click', () => {
            const region =
              feature.properties.region || feature.properties.NAME_1;
            const prefecture =
              feature.properties.prefecture || feature.properties.NAME_2;
            const sousPrefecture =
              feature.properties.sousPrefecture || feature.properties.NAME_3;

            this.selectedRegion = region;
            this.selectedPrefecture = prefecture;
            this.selectedSousPrefecture = sousPrefecture;
            this.selectedLatitude = (layer as L.Polygon)
              .getBounds()
              .getCenter().lat;
            this.selectedLongitude = (layer as L.Polygon)
              .getBounds()
              .getCenter().lng;
            const modalElement = document.getElementById('zoneModal');
            const modal = new bootstrap.Modal(modalElement!);
            modal.show();
          });
        },
      }).addTo(this.map);
    });
  }

  getAllRegions() {
    this.regionService.findAll().subscribe(
      (response: Region[]) => {
        this.regions = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  customSearchFn(searchString: string, item: Region) {
    searchString = searchString.toLowerCase();
    return item.name.toLowerCase().includes(searchString);
  }

  filter() {
    throw new Error('Method not implemented.');
  }
  clearInputs() {
    throw new Error('Method not implemented.');
  }

  saveData() {
    const newZone: Zone = {
      nom: this.selectedSousPrefecture,
      statut: this.electrificationStatus ? 'electrified' : 'notElectrified',
      longitude: this.selectedLongitude,
      latitude: this.selectedLatitude,
      type: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.zoneService.new(newZone).subscribe(
      (_) => {
        this.toast.success('Zone ajoutée avec succès');

        // Fermer le modal
        const modalElement = document.getElementById('zoneModal');
        const modal = bootstrap.Modal.getInstance(modalElement!);
        modal?.hide();

        // Ajouter le marqueur immédiatement sur la carte
        L.marker([this.selectedLatitude, this.selectedLongitude], {
          icon: this.electrificationStatus ? this.greenIcon : this.redIcon,
        })
          .addTo(this.map)
          .bindPopup(`<b>${this.selectedSousPrefecture}</b>`);
      },
      (err) => {
        this.toast.error("Echec d'ajout de la zone");
      }
    );
  }

  getAllZone() {
    this.zoneService.findAll().subscribe(
      (res: Zone[]) => {
        this.zones = res;

        this.cities = this.zones.map((zone) => ({
          name: zone.nom,
          coords: [zone.latitude, zone.longitude],
          electrified: zone.statut === 'electrified',
        }));

        // Affiche les marqueurs après chargement
        this.displayCityMarkers();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  private displayCityMarkers() {
    this.cities.forEach((city) => {
      L.marker(city.coords, {
        icon: city.electrified ? this.greenIcon : this.redIcon,
      })
        .addTo(this.map)
        .bindPopup(`<b>${city.name}</b>`);
    });
  }

  private filterPrefectures() {
    this.filterFormGroup.get('region')?.valueChanges.subscribe((regionId) => {
      if (regionId) {
        this.regionService
          .getPrefecturesByRegion(regionId)
          .subscribe((prefectures) => {
            this.filteredPrefectures = prefectures;
            // Réinitialise le champ prefecture et sous-prefecture
            this.filterFormGroup.patchValue({
              prefecture: null,
              sousPrefecture: null,
            });
          });
      } else {
        this.filteredPrefectures = [];
        this.filterFormGroup.patchValue({
          prefecture: null,
          sousPrefecture: null,
        });
      }
    });
  }

  private filterSousPrefectures() {
    this.filterFormGroup
      .get('prefecture')
      ?.valueChanges.subscribe((prefectureId) => {
        if (prefectureId) {
          this.prefectureService
            .getSousPrefecturesByPrefecture(prefectureId)
            .subscribe((sousPrefectures) => {
              this.filteredSousPrefectures = sousPrefectures;
              // Réinitialise le champ sous-prefecture
              this.filterFormGroup.patchValue({
                sousPrefecture: null,
              });
            });
        } else {
          this.filteredSousPrefectures = [];
          this.filterFormGroup.patchValue({
            sousPrefecture: null,
          });
        }
      });
  }

  private filterQuartiers() {
    this.filterFormGroup
      .get('sousPrefecture')
      ?.valueChanges.subscribe((quartierId) => {
        if (quartierId) {
          this.sousPrefectureService
            .getQuartiersBySousPrefecture(quartierId)
            .subscribe((quartiers) => {
              this.filteredQuartiers = quartiers;
            });
        } else {
          this.filteredQuartiers = [];
        }
      });
  }
}
