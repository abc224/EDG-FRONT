import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionService } from '../../services/region.service';
import { Region } from '../../models/region';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liste-regions',
  templateUrl: './liste-regions.component.html',
  styleUrl: './liste-regions.component.css',
})
export class ListeRegionsComponent implements OnInit {
  regionForm!: FormGroup;
  region!: Region;
  regions!: Region[];
  modalTitle: string = "Ajout d'une nouvelle region";
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private regionService: RegionService,
    private toast: ToastrService
  ) {
    this.regionForm = this.formBuilder.group({
      name: [this.region ? this.region.name : '', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getAllRegions();
  }
  regionsIsLoading = true;
  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onSubmit() {
    if (this.regionForm.valid) {
      const formData = this.regionForm.value;
      console.log('Formulaire soumis avec succès :', formData);
      this.regionService.new(formData).subscribe(
        (res: Region) => {
          this.toast.success('Region ajoutée avec succes');
          this.regions.unshift(res);
        },
        (err) => {
          alert(err);
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
        this.regionsIsLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeleteRegion(idRegion: number) {
    if (confirm('Voulez-vous vraiment supprimer cette region?')) {
      this.regionService.delete(idRegion).subscribe(
        () => {
          this.toast.success('Region supprimée avec succès');
          this.regions = this.regions.filter(
            (region) => region.id !== idRegion
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
