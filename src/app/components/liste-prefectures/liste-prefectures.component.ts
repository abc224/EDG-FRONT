import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionService } from '../../services/region.service';
import { ToastrService } from 'ngx-toastr';
import { Prefecture } from '../../models/prefecture';
import { PrefectureService } from '../../services/prefecture.service';
import 'datatables.net';
import $ from 'jquery';
import { Region } from '../../models/region';
@Component({
  selector: 'app-liste-prefectures',
  templateUrl: './liste-prefectures.component.html',
  styleUrl: './liste-prefectures.component.css',
})
export class ListePrefecturesComponent implements OnInit {
  modalTitle: string = "Ajout d'une nouvelle préfecture";
  prefectureForm!: FormGroup;
  @ViewChild('dataTable', { static: false }) table!: ElementRef;
  prefecturesIsLoading = true;

  prefectures!: Prefecture[];
  prefecture!: Prefecture;
  regions!: Region[];
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private regionService: RegionService,
    private prefectureService: PrefectureService,
    private toast: ToastrService
  ) {
    this.prefectureForm = this.formBuilder.group({
      region: [
        this.prefecture ? this.prefecture.region : '',
        Validators.required,
      ],
      name: [this.prefecture ? this.prefecture.name : '', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getAllRegions();
    this.getAllPrefectures();
  }

  // open(content: any) {
  //   this.modalService.open(content, { centered: true });
  // }

  open(content: any, idPrefecture?: number) {
    if (idPrefecture !== undefined) {
      this.prefectureService.findById(idPrefecture).subscribe(
        (res: any) => {
          this.prefecture = res;
          this.prefectureForm.get('name')?.setValue(this.prefecture.name);
          this.modalTitle = "Modification d'une prefecture";
        },
        (err) => {
          alert('erreur');
        }
      );
    }

    this.modalService.open(content, { centered: true });
  }

  onSubmit() {
    if (this.prefectureForm.valid) {
      const formData = this.prefectureForm.value;
      console.log('Formulaire soumis avec succès :', formData);
      this.prefectureService.new(formData).subscribe(
        (res: Prefecture) => {
          this.toast.success('Prefecture ajoutée avec succès');
          this.prefectures.unshift(res);
        },
        (err) => {
          this.toast.error("Echec d'ajout de la prefecture");
        }
      );
    } else {
      console.warn('Formulaire invalide');
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
        // Initialiser DataTables après que les données ont été chargées
        setTimeout(() => {
          $(this.table.nativeElement).DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            // responsive: true,
          });
          this.prefecturesIsLoading = false;
        }, 0);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeletePrefecture(prefectureId: number) {
    throw new Error('Method not implemented.');
  }
}
