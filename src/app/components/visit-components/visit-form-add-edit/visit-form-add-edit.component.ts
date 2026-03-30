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

  public patientId: number = 0;
  public visitId: number = 0;
  public operacion: string = 'Crear';

  visitForm: FormGroup;

  loading: boolean = false;


  constructor(private fb: FormBuilder, private aRouter: ActivatedRoute) {
    // Inicializar el formulario del paciente
    this.visitForm = this.fb.group({
          date: ['', Validators.required],
          description: ['', Validators.required],
          treatment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const patientIdParam = this.aRouter.snapshot.paramMap.get('patientId');
    const visitIdParam = this.aRouter.snapshot.paramMap.get('visitId');

    if (patientIdParam) {
      this.patientId = Number(patientIdParam);
      this.operacion = 'Crear';
      console.log('Paciente:', this.patientId);
    }

    if (visitIdParam) {
      this.visitId = Number(visitIdParam);
      this.operacion = 'Editar';
      console.log('Visita:', this.visitId);

      this.getVisit(this.visitId);
    }
  }

  getVisit(id: number) {
    this.loading = true;

    this._patientService.getVisitById(id).subscribe((response: Visit) => {
      this.visitForm.patchValue({
        date: response.date,
        description: response.description,
        treatment: response.treatment
      });

      if (response.patientId?.id) {
        this.patientId = response.patientId.id;
      }

      this.loading = false;
    });
  }


createVisit() {
  this.loading = true;

  const visit: Visit = {
    date: this.visitForm.value.date,
    description: this.visitForm.value.description,
    treatment: this.visitForm.value.treatment,
    patientId: { id: this.patientId } // ✅ CORRECTO
  };

  if (this.visitId != 0) {
    // EDITAR
    visit.id = this.visitId;

    this._patientService.updateVisit(visit).subscribe({
      next: (response: Visit) => {
        this.toastr.info(`Visita del ${visit.date} actualizada correctamente`, 'ClinicData');
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      }
    });

  } else {
    // CREAR
    this._patientService.createVisit(this.patientId, visit).subscribe({
      next: (response: number) => {

        this._patientService.getPatientById(this.patientId).subscribe((response: Patient) => {
          this._patientService.patientView = response;
        });

        this.toastr.success(`Visita del ${visit.date} guardada correctamente`, 'ClinicData');
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      }
    });
  }
}


}
