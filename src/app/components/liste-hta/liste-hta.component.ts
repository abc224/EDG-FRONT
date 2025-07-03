import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Station } from '../../models/station';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StationService } from '../../services/station.service';
import { ToastrService } from 'ngx-toastr';
import { Region } from '../../models/region';
import { Zone } from '../../models/zone';
import { Prefecture } from '../../models/prefecture';
import { SousPrefecture } from '../../models/sousPrefecture';
import { Quartier } from '../../models/quartier';
import { RegionService } from '../../services/region.service';
import { PrefectureService } from '../../services/prefecture.service';
import { ZoneService } from '../../services/zone.service';
import { SousPrefectureService } from '../../services/sous-prefecture.service';
import { HttpClient } from '@angular/common/http';
import L from 'leaflet';

@Component({
  selector: 'app-liste-hta',
  templateUrl: './liste-hta.component.html',
  styleUrl: './liste-hta.component.css',
})
export class ListeHtaComponent implements OnInit {
  modalTitle: string = "Ajout d'une nouvelle station";
  htaForm!: FormGroup;
  @ViewChild('dataTable', { static: false }) table!: ElementRef;
  htasIsLoading = true;
  regions!: Region[];
  zones!: Zone[];
  filteredPrefectures: Prefecture[] = [];
  filteredSousPrefectures: SousPrefecture[] = [];
  filteredQuartiers: Quartier[] = [];
  stations!: Station[];
  station!: Station;
  selectedLatitude: number = 0;
  selectedLongitude: number = 0;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private stationService: StationService,
    private toast: ToastrService,
    private regionService: RegionService,
    private prefectureService: PrefectureService,
    private zoneService: ZoneService,
    private formBuider: FormBuilder,
    private sousPrefectureService: SousPrefectureService,
    private http: HttpClient
  ) {
    this.htaForm = this.formBuilder.group({
      region: ['', Validators.required],
      prefecture: ['', Validators.required],
      sousPrefecture: ['', Validators.required],
      quartier: ['', Validators.required],
      statut: ['', Validators.required],
      type: ['', Validators.required],
      latitude: [''],
      longitude: [''],
      capacite: ['', Validators.required],
      nom: [''],
    });
  }
  ngOnInit(): void {
    this.getAllStations();
    this.getAllRegions();
    this.filterPrefectures();
    this.filterSousPrefectures();
    this.filterQuartiers();
  }

  // open(content: any) {
  //   this.modalService.open(content, { centered: true });
  // }

  open(content: any, idStation?: number) {
    if (idStation !== undefined) {
      this.stationService.findById(idStation).subscribe(
        (res: any) => {
          this.station = res;
          this.htaForm.get('statut')?.setValue(this.station.statut);
          this.htaForm.get('type')?.setValue(this.station.type);
          this.htaForm.get('capacite')?.setValue(this.station.capacite);
          this.htaForm.get('nom')?.setValue(this.station.nom);
          this.modalTitle = "Modification d'une station";
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.modalService.open(content, { centered: true });
  }

  async onSubmit() {
    if (this.htaForm.valid) {
      //  const formData = this.htaForm.value;
      await this.getCoordinatesFromFormSelection();
      const newStation = new FormData();

      newStation.append('nom', this.htaForm.get('nom')?.value);
      newStation.append('statut', this.htaForm.get('statut')?.value);
      //formData.append('zone', this.station.zone);
      newStation.append('longitude', this.selectedLongitude.toString());
      newStation.append('latitude', this.selectedLatitude.toString());
      newStation.append('capacite', this.htaForm.get('capacite')?.value);
      // newStation.append('zone', '2');
      newStation.append('type', this.htaForm.get('type')?.value);
      // const newStation: Station = {
      //   nom: this.htaForm.get('nom')?.value,
      //   type: this.htaForm.get('type')?.value,
      //   statut: this.htaForm.get('statut')?.value,
      //   longitude: this.selectedLongitude,
      //   latitude: this.selectedLatitude,
      //   capacite: this.htaForm.get('capacite')?.value,
      // };
      if (this.station) {
        this.stationService.update(this.station.id, newStation).subscribe(
          (res: Station) => {
            this.toast.success('Station modifiée avec succès');
            this.stations.unshift(res);
            console.log('Formulaire soumis avec succès :', newStation);
          },
          (err) => {
            console.log(JSON.stringify(err));
            this.toast.error("Echec d'ajout de la sous station", err);
          }
        );
      } else {
        this.stationService.new(newStation).subscribe(
          (res: Station) => {
            this.toast.success('Station ajoutée avec succès');
            this.stations.unshift(res);
            console.log('Formulaire soumis avec succès :', newStation);
          },
          (err) => {
            console.log(JSON.stringify(err));
            this.toast.error("Echec d'ajout de la sous station", err);
          }
        );
      }
      this.selectedLatitude = 0;
      this.selectedLongitude = 0;
    } else {
      console.warn('Formulaire invalide');
      Object.keys(this.htaForm.controls).forEach((key) => {
        const controlErrors = this.htaForm.get(key)?.errors;
        if (controlErrors) {
          console.warn(`Erreur dans le champ '${key}':`, controlErrors);
        }
      });
    }
  }

  getAllStations() {
    this.stationService.findAll().subscribe(
      (response: Station[]) => {
        this.stations = response;
        // Initialiser DataTables après que les données ont été chargées
        setTimeout(() => {
          $(this.table.nativeElement).DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            // responsive: true,
          });
          this.htasIsLoading = false;
        }, 0);
      },
      (error) => {
        console.log(error);
      }
    );
    // this.stationService.findAll().subscribe(
    //   (response: Station[]) => {
    //     this.stations = response;
    //     this.htasIsLoading = false;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
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

  filterPrefectures() {
    this.htaForm.get('region')?.valueChanges.subscribe((regionId) => {
      if (regionId) {
        this.regionService
          .getPrefecturesByRegion(regionId)
          .subscribe((prefectures) => {
            this.filteredPrefectures = prefectures;
            // Réinitialise le champ prefecture et sous-prefecture
            this.htaForm.patchValue({
              prefecture: null,
              quartier: null,
            });
          });
      } else {
        this.filteredPrefectures = [];
        this.htaForm.patchValue({
          prefecture: null,
          quartier: null,
        });
      }
    });
  }

  filterSousPrefectures() {
    this.htaForm.get('prefecture')?.valueChanges.subscribe((prefectureId) => {
      if (prefectureId) {
        this.prefectureService
          .getSousPrefecturesByPrefecture(prefectureId)
          .subscribe((sousPrefectures) => {
            this.filteredSousPrefectures = sousPrefectures;
            // Réinitialise le champ sous-prefecture
            this.htaForm.patchValue({
              sousPrefecture: null,
            });
          });
      } else {
        this.filteredSousPrefectures = [];
        this.htaForm.patchValue({
          sousPrefecture: null,
        });
      }
    });
  }

  filterQuartiers() {
    this.htaForm.get('sousPrefecture')?.valueChanges.subscribe((quartierId) => {
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

  customSearchFn(searchString: string, item: Region) {
    searchString = searchString.toLowerCase();
    return item.name.toLowerCase().includes(searchString);
  }

  normalize(str: string | undefined): string {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  getCoordinatesFromFormSelection(): Promise<void> {
    return new Promise((resolve, reject) => {
      const regionId = this.htaForm.get('region')?.value;
      const prefectureId = this.htaForm.get('prefecture')?.value;
      const sousPrefId = this.htaForm.get('sousPrefecture')?.value;
      const quartierId = this.htaForm.get('nom')?.value;

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
      const quartierName = this.filteredQuartiers
        .find((q) => q.id === quartierId)
        ?.name?.toLowerCase()
        .trim();

      this.http.get('assets/guinea.json').subscribe({
        next: (data: any) => {
          const layerGroup = L.geoJSON(data);
          let found = false;

          layerGroup.eachLayer((lyr: any) => {
            const props = lyr.feature.properties;
            const region = props.NAME_1?.toLowerCase().trim();
            const prefecture = props.NAME_2?.toLowerCase().trim();
            const sousPref = props.NAME_3?.toLowerCase().trim();
            const name = props.name?.toLowerCase().trim(); // quartier

            const matchQuartier =
              quartierName &&
              this.normalize(quartierName) === this.normalize(name);
            const matchSousPref =
              sousPrefName &&
              this.normalize(sousPrefName) === this.normalize(sousPref);
            const matchPref =
              prefectureName &&
              this.normalize(prefectureName) === this.normalize(prefecture);
            const matchRegion =
              regionName &&
              this.normalize(regionName) === this.normalize(region);

            if (matchQuartier || matchSousPref || matchPref || matchRegion) {
              const center = lyr.getBounds().getCenter();
              this.selectedLatitude = center.lat;
              this.selectedLongitude = center.lng;
              console.log('📍 Coordonnées trouvées :', center);
              found = true;
            }
          });

          if (!found) {
            alert(
              'Aucune zone correspondante trouvée pour récupérer les coordonnées.'
            );
          }

          resolve(); // important
        },
        error: (err) => {
          console.error('Erreur chargement JSON', err);
          reject(err);
        },
      });
    });
  }

  onDeleteStation(stationID: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette station?')) {
      this.stationService.delete(stationID).subscribe({
        next: (res: Station) => {
          console.log(`Station supprimée avec succès.`);
          this.stations = this.stations.filter(
            (station) => station.id !== stationID
          );
          this.toast.success('Station supprimée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la station :', err);
          // Optionnel : notifier l'utilisateur via un toast ou une alerte
        },
      });
    }
  }
}
