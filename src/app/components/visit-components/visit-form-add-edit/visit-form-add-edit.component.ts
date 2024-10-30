import { Component, inject } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Visit } from '../../../interfaces/visit';
import { Patient } from '../../../interfaces/patient';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visit-form-add-edit',
  standalone: true,
  imports: [ProgressBarComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './visit-form-add-edit.component.html',
  styleUrl: './visit-form-add-edit.component.css',
})
export class VisitFormAddEditComponent {
  private _patientService = inject(PatientService);
  private router = inject(Router);
  private toastr= inject(ToastrService);

  public patientId:number = this._patientService.patientId;

  visitForm: FormGroup;

  loading: boolean = false;
  operacion: string = 'Crear';
  id: number;

  constructor(private fb: FormBuilder, private aRouter: ActivatedRoute) {
    // Inicializar el formulario del paciente
    this.visitForm = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      treatment: ['', Validators.required],
      patientId: ['']
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      //console.log(this.id != 0)
      this.operacion = 'Editar ';
      this.getVisit(this.id);
    }
  }

  getVisit(id: number) {
    this.loading = true;
    this._patientService.getVisitById(id).subscribe((response: Visit) => {
      //console.log(response)
      this.visitForm.setValue({
        date: response.date,
        description: response.description,
        treatment: response.treatment,
        patientId: this.patientId 
      });
      this.loading = false;
    });
  }

  
  
  createVisit() {
    this.loading = true;
    const visit: Visit = {
      date: this.visitForm.value.date,
      description: this.visitForm.value.description,
      treatment: this.visitForm.value.treatment,
      id: this.visitForm.value.patientId,
      patient: { id: this.visitForm.value.patientId }
    };
    if (this.id != 0) {
      //es Editar
      visit.id = this.id;
      this._patientService.updateVisit(visit).subscribe((response: Visit) => {

        this.toastr.info(`Visita del ${visit.date} actualizado correctamente`, "ClinicData");
        this.loading = false;

        this._patientService
          .getVisitById(this.id)
          .subscribe((response: Visit) => {
            this._patientService.visitView = response;
          });
          this._patientService.getPatientById(this._patientService.patientView.id!).subscribe((response: Patient) =>{
            this._patientService.patientView = response;

            this._patientService.patientView.visitList.sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });      

          })
        this.router.navigate(['/']);
      });
    } else {
      console.log("paciente: "+ this._patientService.patientView.id!)

      visit.patient.id = this._patientService.patientView.id!;

      console.log("Visit: "+ visit.patient.id)

      this._patientService
        .createVisit(visit)
        .subscribe((response: number) => {
              //console.log(response);

              this.toastr.success(`Visita del ${visit.date} guardada correctamente`, "ClinicData");
              this.loading = false;

              this._patientService.getPatientById(this._patientService.patientView.id!).subscribe((response: Patient) =>{
                this._patientService.patientView = response;

                this._patientService.patientView.visitList.sort((a, b) => {
                  return new Date(b.date).getTime() - new Date(a.date).getTime();
                });          

              })
              this.router.navigate(['/']);
        })
    }
  }

  


}
