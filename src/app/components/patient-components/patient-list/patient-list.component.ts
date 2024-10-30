import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../interfaces/patient';
import { ProgressBarComponent } from "../../../shared/progress-bar/progress-bar.component";
import { DniFormatPipe } from '../../../shared/pipes/dni-format.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProgressBarComponent,
    DniFormatPipe 
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {
  public _patientService = inject(PatientService);
  loading: boolean = false;

  constructor(private toastr: ToastrService){};

  ngOnInit(): void {
    this.getListPatients();
   }

   getListPatients(){
    this.loading = true;
    this._patientService.getPatients().subscribe((response: Patient[])=>{
      console.log(response)
      this._patientService.patients = response.sort((a, b) => {
        // Convertir a minúsculas para evitar problemas con las mayúsculas
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });

      this.loading = false;
    },
    error => {
      console.error("Error al obtener los productos:", error); // Verifica si hay algún error
    }
  );
  }

  getPatientView(id: number){
    this._patientService.getPatientById(id).subscribe((response: Patient) =>{
      this._patientService.patientView = response;

      this._patientService.patientView.visitList.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      this._patientService.patientId = response.id!;

      //console.log( "PatientID:" + this._patientService.patientId );
      //console.log(this._patientService.patientView)

      this._patientService.visitView ={
        id: 0,
        date: '',
        description: '',
        treatment: '',
        patient:{
          id: 0
        }
      }
    })
  }

  deletePatient(id: number){
    this._patientService.deletePatient(id).subscribe((response: String) =>{
      this._patientService.patientView = {
        id: 0,
        name: " del Paciente",
        lastName: " del Paciente",
        email: "example@domain.com",
        phone: 1234567890,
        dni: 12345678,
        visitList: [] // Lista de visitas asociadas al paciente
      };
      this.toastr.warning(`Paciente eliminado correctamente`, "ClinicData");
      this.getListPatients(); // Actualiza la lista de pacientes después de la eliminación     
    });
  }

}
