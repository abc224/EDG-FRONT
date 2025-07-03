import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SourceFinancement } from '../../models/source-financement';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceFinancementService } from '../../services/source-financement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-source-financement',
  templateUrl: './source-financement.component.html',
  styleUrl: './source-financement.component.css',
})
export class SourceFinancementComponent {
  sourceFinancementForm!: FormGroup;
  sourceFinancement!: SourceFinancement;
  sourceFinancements!: SourceFinancement[];
  modalTitle: string = "Ajout d'une nouvelle source de financement";
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private sourceFinancementService: SourceFinancementService,
    private toast: ToastrService
  ) {
    this.sourceFinancementForm = this.formBuilder.group({
      libelle: [
        this.sourceFinancement ? this.sourceFinancement.libelle : '',
        Validators.required,
      ],

      type: [
        this.sourceFinancement ? this.sourceFinancement.type : '',
        Validators.required,
      ],
    });
  }
  ngOnInit(): void {
    this.getAllSourceFinancements();
  }
  regionsIsLoading = true;
  // open(content: any) {
  //   this.modalService.open(content, { centered: true });
  // }

  open(content: any, idSource?: number) {
    if (idSource !== undefined) {
      this.sourceFinancementService.findById(idSource).subscribe(
        (res: any) => {
          this.sourceFinancement = res;
          this.sourceFinancementForm
            .get('libelle')
            ?.setValue(this.sourceFinancement.libelle);
          this.sourceFinancementForm
            .get('type')
            ?.setValue(this.sourceFinancement.type);
          this.modalTitle = "Modification d'une source de financement";
        },
        (err) => {
          alert('erreur');
        }
      );
    }

    this.modalService.open(content, { centered: true });
  }

  onSubmit() {
    if (this.sourceFinancementForm.valid) {
      const formData = new FormData();
      formData.append(
        'libelle',
        this.sourceFinancementForm.get('libelle')?.value
      );
      formData.append('logo', '');
      console.log('Formulaire soumis avec succès :', formData);
      if (this.sourceFinancement) {
        this.sourceFinancementService
          .update(this.sourceFinancement.id, formData)
          .subscribe(
            (res: SourceFinancement) => {
              this.toast.success('Source de financement modifiée avec succès');
              this.sourceFinancements.unshift(res);
            },
            (err) => {
              alert(err);
            }
          );
      } else {
        this.sourceFinancementService.new(formData).subscribe(
          (res: SourceFinancement) => {
            this.toast.success('Source de financement ajoutée avec succes');
            this.sourceFinancements.unshift(res);
          },
          (err) => {
            alert(err);
          }
        );
      }
    } else {
      console.warn('Formulaire invalide');
    }
  }

  getAllSourceFinancements() {
    this.sourceFinancementService.findAll().subscribe(
      (response: SourceFinancement[]) => {
        this.sourceFinancements = response;
        this.regionsIsLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeleteSourceFinancement(idSource: number) {
    if (confirm('Voulez-vous vraiment supprimer cette source?')) {
      this.sourceFinancementService.delete(idSource).subscribe(
        () => {
          this.toast.success('Source supprimée avec succès');
          this.sourceFinancements = this.sourceFinancements.filter(
            (source) => source.id !== idSource
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
