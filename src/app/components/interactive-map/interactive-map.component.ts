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
import { StationService } from '../../services/station.service';
import { Station } from '../../models/station';
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
  selectedHeuresDisponibles = 0;
  selectedTauxElectrification = 0;
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
    private sousPrefectureService: SousPrefectureService,
    private stationService: StationService
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
    this.getAllStations();
  }

  ngAfterViewInit() {
    this.initMap();
    this.loadGeoJSON();
    this.getAllRegions();
    this.getAllStations();
  }

  private cities: {
    name: string;
    coords: L.LatLngTuple;
    electrified: boolean;
    tauxElectrification: number;
  }[] = [];

  private stations: {
    name: string;
    statut: string;
    coords: L.LatLngTuple;
  }[] = [];

  htaIcon = L.icon({
    iconUrl: 'assets/images/hta.png', // Chemin vers l'image
    iconSize: [30, 30], // Taille de l'icône
    iconAnchor: [15, 30], // Point d’ancrage de l’icône
    popupAnchor: [0, -30], // Position du popup par rapport à l’icône
  });

  private initMap(): void {
    this.map = L.map('map').setView([10.5, -10.5], 6.5);
    // this.map = L.map('map').setView([9.641, -13.578], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // this.cities.forEach((city) => {
    //   L.marker(city.coords, {
    //     icon: city.electrified ? this.greenIcon : this.redIcon,
    //   })
    //     .addTo(this.map)
    //     .bindPopup(`<b>${city.name}</b>`);
    // });

    // this.stations.forEach((station) => {
    //   L.marker(station.coords, {
    //     icon: this.htaIcon,
    //   })
    //     .addTo(this.map)
    //     .bindPopup(`<b>${station.name}</b>`);
    // });

    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'legend leaflet-control');
      div.innerHTML = `<div style="background: #ffffff;  padding: 10px;
  font-size: 10px;
  border-radius: 5px;
  line-height: 1.4em;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  color: #333;">
    <h6>Légende</h6>
    <div><i style="background: #00AB32; width: 15px; height: 15px; display: inline-block; margin-right: 6px;"></i>Taux > 90</div>
    <div><i style="background: #FFF300; width: 15px; height: 15px; display: inline-block; margin-right: 6px;"></i> Taux >= 70</div>
    <div><i style="background: #FFA500; width: 15px; height: 15px; display: inline-block; margin-right: 6px;"></i> Taux >= 50</div>
    <div><i style="background: #ff0000; width: 15px; height: 15px; display: inline-block; margin-right: 6px;"></i> Taux < 50</div>
    <div><img src="assets/images/hta.png" style="width: 15px; height: 15px; margin-right: 6px;" /> Stations</div>
 </div> `;
      return div;
    };

    legend.addTo(this.map);
  }

  private loadGeoJSON(): void {
    this.http.get('assets/guinea.json').subscribe((data: any) => {
      L.geoJSON(data, {
        style: () => ({
          color: 'yellow',
          weight: 1,
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

  saveData() {
    const newZone: Zone = {
      nom: this.selectedSousPrefecture,
      statut: this.electrificationStatus ? 'electrified' : 'notElectrified',
      longitude: this.selectedLongitude,
      latitude: this.selectedLatitude,
      type: '',
      heuresDisponibles: this.selectedHeuresDisponibles,
      tauxElectrification: this.selectedTauxElectrification,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.zoneService.new(newZone).subscribe(
      (res: Zone) => {
        this.toast.success('Zone ajoutée avec succès');
        // Fermer le modal
        const modalElement = document.getElementById('zoneModal');
        const modal = bootstrap.Modal.getInstance(modalElement!);
        modal?.hide();

        // Ajouter le marqueur immédiatement sur la carte
        const circle = L.circleMarker([newZone.latitude, newZone.longitude], {
          radius: 7,
          color: this.getColor(newZone.tauxElectrification),
          fillColor: this.getColor(newZone.tauxElectrification),
          fillOpacity: 0.8,
          weight: 1,
        });

        circle.addTo(this.map).bindPopup(
          `<b>${newZone.nom}</b><br>
       Taux d'électrification : ${newZone.tauxElectrification}%<br>
       Heures disponibles : ${newZone.heuresDisponibles}h/24h`
        );

        // L.marker([this.selectedLatitude, this.selectedLongitude], {
        //   icon: this.electrificationStatus ? this.greenIcon : this.redIcon,
        // })
        //   .addTo(this.map)
        //   .bindPopup(`<b>${this.selectedSousPrefecture}</b>`);
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
        this.zones.forEach((zone) => {
          const circle = L.circleMarker([zone.latitude, zone.longitude], {
            radius: 7,
            color: this.getColor(zone.tauxElectrification),
            fillColor: this.getColor(zone.tauxElectrification),
            fillOpacity: 0.8,
            weight: 1,
          });

          circle.addTo(this.map).bindPopup(
            `<b>${zone.nom}</b><br>
       Taux d'électrification : ${zone.tauxElectrification}%<br>
       Heures disponibles : ${zone.heuresDisponibles}h / 24h`
          );
        });
        this.cities = this.zones.map((zone) => ({
          name: zone.nom,
          coords: [zone.latitude, zone.longitude],
          electrified: zone.statut === 'electrified',
          heuresDisponibles: zone.heuresDisponibles,
          tauxElectrification: (zone.heuresDisponibles / 24) * 100,
        }));

        // Affiche les marqueurs après chargement
        //  this.displayHTA();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  private getAllStations() {
    this.stationService.findAll().subscribe(
      (res: any[]) => {
        this.stations = res.map((s) => ({
          name: s.nom,
          statut: s.statut,
          coords: [s.latitude, s.longitude],
        }));
        this.displayHTA();
      },
      (err) => {}
    );
  }

  // private displayHTA() {
  //   console.log(this.stations);
  //   this.stations.forEach((station) => {
  //     L.marker(station.coords, {
  //       icon: this.htaIcon,
  //     })
  //       .addTo(this.map)
  //       .bindPopup(
  //         `<b>${station.name}</b><br><span>Statut: </span>${station.statut}`
  //       );
  //   });
  // }

  private displayHTA() {
    this.stations.forEach((station) => {
      const lat =
        typeof station.coords[0] === 'string'
          ? parseFloat(station.coords[0])
          : station.coords[0];
      const lng =
        typeof station.coords[1] === 'string'
          ? parseFloat(station.coords[1])
          : station.coords[1];

      if (!isNaN(lat) && !isNaN(lng)) {
        L.marker([lat, lng], {
          icon: this.htaIcon,
        })
          .addTo(this.map)
          .bindPopup(
            `<b>${station.name}</b><br><span>Statut: </span>${station.statut}`
          );
      } else {
        console.warn('Coordonnées invalides pour la station :', station.name);
      }
    });
  }

  filterPrefectures() {
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

  filterSousPrefectures() {
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

  filterQuartiers() {
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

  filter() {
    const regionId = this.filterFormGroup.get('region')?.value;
    const prefectureId = this.filterFormGroup.get('prefecture')?.value;
    const sousPrefId = this.filterFormGroup.get('sousPrefecture')?.value;
    const zoneName = this.filterFormGroup.get('zone')?.value;

    const regionName = this.regions
      .find((r) => r.id === regionId)
      ?.name?.toLowerCase()
      .trim();
    const prefectureName = this.filteredPrefectures
      .find((p) => p.id === prefectureId)
      ?.name?.toLowerCase()
      .trim();
    const sousPrefName = this.filteredSousPrefectures
      .find((s) => s.id === sousPrefId)
      ?.name?.toLowerCase()
      .trim();

    this.http.get('assets/guinea.json').subscribe((data: any) => {
      const layerGroup = L.geoJSON(data);
      let targetLayer: any = null;
      let zoomLevel = 7;

      layerGroup.eachLayer((lyr: any) => {
        const props = lyr.feature.properties;

        const region = props.NAME_1?.toLowerCase().trim();
        const prefecture = props.NAME_2?.toLowerCase().trim();
        const sousPref = props.NAME_3?.toLowerCase().trim();
        const name = props.name?.toLowerCase().trim(); // pour zone

        const matchZone =
          zoneName && this.normalize(zoneName) === this.normalize(name);
        const matchSousPref =
          sousPrefName &&
          this.normalize(sousPrefName) === this.normalize(sousPref);
        const matchPref =
          prefectureName &&
          this.normalize(prefectureName) === this.normalize(prefecture);
        const matchRegion =
          regionName && this.normalize(regionName) === this.normalize(region);

        if (matchZone || matchSousPref || matchPref || matchRegion) {
          targetLayer = lyr;

          // Déterminer un zoom adapté
          if (matchZone) zoomLevel = 13;
          else if (matchSousPref) zoomLevel = 12;
          else if (matchPref) zoomLevel = 11;
          else if (matchRegion) zoomLevel = 9;
        }
      });

      if (targetLayer) {
        this.map.fitBounds(targetLayer.getBounds(), {
          maxZoom: zoomLevel,
          padding: [20, 20],
        });
        targetLayer.setStyle({ weight: 2.5, color: 'blue' });
        targetLayer.openPopup();
      } else {
        alert('Aucune zone trouvée avec ces critères.');
      }
    });
  }

  normalize(str: string | undefined): string {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  clearInputs() {
    // 1. Réinitialiser le formulaire
    this.filterFormGroup.reset();

    // 2. Vider les listes filtrées si tu en as (sinon ignorer)
    this.filteredPrefectures = [];
    this.filteredSousPrefectures = [];
    this.filteredQuartiers = [];

    // 3. Recentrer la carte sur la Guinée
    this.map.setView([10.5, -10.5], 6.5);

    // 4. (Facultatif) Retirer les styles appliqués précédemment
    // Recharge les données GeoJSON pour repartir à zéro
    this.map.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        this.map.removeLayer(layer);
      }
    });
    this.loadGeoJSON(); // Recharge les régions sans style modifié
  }

  getColor(taux: number): string {
    if (taux >= 90) return '#00AB32'; // vert
    else if (taux >= 70) return '#FFF300'; // jaune
    else if (taux >= 50) return '#FFA500'; // orange
    else return '#ff0000'; // rouge
  }

  updateTaux() {
    const heuresMax = 24; // ou un autre nombre si tu veux
    if (
      this.selectedHeuresDisponibles >= 0 &&
      this.selectedHeuresDisponibles <= heuresMax
    ) {
      this.selectedTauxElectrification =
        (this.selectedHeuresDisponibles / heuresMax) * 100;
    } else {
      this.selectedTauxElectrification = 0;
    }
  }
}
