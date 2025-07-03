import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Region } from '../../models/region';
import { SousPrefecture } from '../../models/sousPrefecture';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionService } from '../../services/region.service';
import { ToastrService } from 'ngx-toastr';
import { SousPrefectureService } from '../../services/sous-prefecture.service';
import 'datatables.net';
import $ from 'jquery';
import { Prefecture } from '../../models/prefecture';
import { PrefectureService } from '../../services/prefecture.service';
@Component({
  selector: 'app-liste-sous-prefectures',
  templateUrl: './liste-sous-prefectures.component.html',
  styleUrl: './liste-sous-prefectures.component.css',
})
export class ListeSousPrefecturesComponent implements OnInit {
  modalTitle: string = "Ajout d'une nouvelle sous préfecture";
  sousPrefectureForm!: FormGroup;
  @ViewChild('dataTable', { static: false }) table!: ElementRef;
  sousPrefecturesIsLoading = true;

  sousPrefectures!: SousPrefecture[];
  sousPrefecture!: SousPrefecture;
  prefectures!: Prefecture[];
  regions!: Region[];
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private regionService: RegionService,
    private prefectureService: PrefectureService,
    private sousPrefectureService: SousPrefectureService,
    private toast: ToastrService
  ) {
    this.sousPrefectureForm = this.formBuilder.group({
      prefecture: [
        this.sousPrefecture ? this.sousPrefecture.prefecture : '',
        Validators.required,
      ],
      name: [
        this.sousPrefecture ? this.sousPrefecture.name : '',
        Validators.required,
      ],
    });
  }
  ngOnInit(): void {
    this.getAllRegions();
    this.getAllPrefectures();
    this.getAllSousPrefectures();
  }

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onSubmit() {
    if (this.sousPrefectureForm.valid) {
      const formData = this.sousPrefectureForm.value;
      console.log('Formulaire soumis avec succès :', formData);
      this.sousPrefectureService.new(formData).subscribe(
        (res: SousPrefecture) => {
          this.toast.success('Sous prefecture ajoutée avec succès');
          this.sousPrefectures.unshift(res);
        },
        (err) => {
          this.toast.error("Echec d'ajout de la sous prefecture");
        }
      );
    } else {
      console.warn('Formulaire invalide');
    }
  }

  getAllSousPrefectures() {
    this.sousPrefectureService.findAll().subscribe(
      (response: SousPrefecture[]) => {
        this.sousPrefectures = response;
        // Initialiser DataTables après que les données ont été chargées
        setTimeout(() => {
          $(this.table.nativeElement).DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            // responsive: true,
          });
          this.sousPrefecturesIsLoading = false;
        }, 5);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeleteSousPrefecture(arg0: number) {
    throw new Error('Method not implemented.');
  }

  getRegionNameFromPrefecture(prefecture: Prefecture) {
    if (prefecture && prefecture.region && prefecture.region.name) {
      return prefecture.region.name;
    } else {
      return 'Région';
    }
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

  getAllPrefectures() {
    this.prefectureService.findAll().subscribe(
      (response: Prefecture[]) => {
        this.prefectures = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
