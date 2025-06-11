import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Village } from '../../models/village';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VillageService } from '../../services/village.service';
import { ToastrService } from 'ngx-toastr';
import 'datatables.net';
import $ from 'jquery';
@Component({
  selector: 'app-liste-villages',
  templateUrl: './liste-villages.component.html',
  styleUrl: './liste-villages.component.css',
})
export class ListeVillagesComponent implements OnInit {
  modalTitle: string = "Ajout d'un nouveau village";
  villageForm!: FormGroup;
  @ViewChild('dataTable', { static: false }) table!: ElementRef;
  villagesIsLoading = true;

  villages!: Village[];
  village!: Village;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private villageService: VillageService,
    private toast: ToastrService
  ) {
    this.villageForm = this.formBuilder.group({
      sousPrefecture: [
        this.village ? this.village.sousprefecture : '',
        Validators.required,
      ],
      name: [this.village ? this.village.name : '', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getAllVillages();
  }

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onSubmit() {
    if (this.villageForm.valid) {
      const formData = this.villageForm.value;
      console.log('Formulaire soumis avec succès :', formData);
      this.villageService.new(formData).subscribe(
        (res: Village) => {
          this.toast.success('Village ajouté avec succès');
          this.villages.unshift(res);
        },
        (err) => {
          this.toast.error("Echec d'ajout de la sous prefecture");
        }
      );
    } else {
      console.warn('Formulaire invalide');
    }
  }

  getAllVillages() {
    this.villageService.findAll().subscribe(
      (response: Village[]) => {
        this.villages = response;
        // Initialiser DataTables après que les données ont été chargées
        setTimeout(() => {
          $(this.table.nativeElement).DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            // responsive: true,
          });
          this.villagesIsLoading = false;
        }, 5);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeleteVillage(idVillage: number) {
    throw new Error('Method not implemented.');
  }
}
