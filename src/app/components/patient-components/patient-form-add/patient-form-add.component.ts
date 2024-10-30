import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../interfaces/patient';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    ProgressBarComponent,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './patient-form-add.component.html',
  styleUrl: './patient-form-add.component.css'
})
export class PatientFormComponent {
  private _patientService = inject(PatientService);
  private router= inject(Router);
  private toastr= inject(ToastrService);


  patientForm: FormGroup;

  loading: boolean = false;
  operacion: string = "Crear";
  id: number;



  constructor(private fb: FormBuilder,
    private aRouter: ActivatedRoute
  ) {
    // Inicializar el formulario del paciente
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0){
      //console.log(this.id != 0)
      this.operacion = 'Editar ';
      this.getPatient(this.id);
    }
  }

  getPatient(id: number) {
    this.loading = true;
    this._patientService.getPatientById(id).subscribe((response: Patient) => {
      //console.log(response)
      this.patientForm.setValue({
        name: response.name,
        lastName: response.lastName,
        dni: response.dni,
        email: response.email,
        phone: response.phone
      })
      this.loading = false;
    })
  }

  createPatient(){
    this.loading = true;
    const patient: Patient = {
      name: this.patientForm.value.name,
      lastName: this.patientForm.value.lastName,
      dni: this.patientForm.value.dni,
      email: this.patientForm.value.email,
      phone: this.patientForm.value.phone,
      visitList: []
    }
     if (this.id != 0){
      //es Editar
      patient.id=this.id;
      this._patientService.getPatientById(patient.id).subscribe((response: Patient) => {
        patient.visitList = response.visitList;
        this._patientService.updatePatient(patient).subscribe((response: Patient) =>{
          this.toastr.info(`Paciente ${patient.name} actualizado correctamente`, "ClinicData");
          this.loading = false;
          this._patientService.getPatientById(this.id).subscribe((response: Patient) =>{
            this._patientService.patientView = response;
          })
          this.router.navigate(['/']);
        })
      });
    } else{
      //es agregar
      this._patientService.createPatient(patient).subscribe((response: number) => {
        this.toastr.success(`Paciente ${patient.name} guardado correctamente`, "ClinicData");
        this.loading = false;
        this.router.navigate(['/']);
      });
    }
  }


}
