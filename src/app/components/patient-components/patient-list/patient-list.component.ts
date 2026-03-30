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
  public currentPage: number = 1;
  public pageSize: number = 13;

  constructor(private toastr: ToastrService){};

  ngOnInit(): void {
    this.getListPatients();
   }

  getListPatients() {
    this.loading = true;

    this._patientService.getPatients().subscribe(
      (response: Patient[]) => {
        this._patientService.patients = response.sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });

        // Ajustar la página actual después de actualizar la lista
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages || 1;
        }

        this.loading = false;
      },
      error => {
        console.error("Error al obtener los productos:", error);
        this.loading = false;
      }
    );
  }

  getPatientView(id: number){
    this._patientService.getPatientById(id).subscribe((response: Patient) =>{
      this._patientService.patientView = response;

      this._patientService.patientView.visits.sort((a, b) => {
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
        patientId:{
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
        address: "Direccion",
        phone: 1234567890,
        dni: 12345678,
        visits: [] // Lista de visitas asociadas al paciente
      };
      this.toastr.warning(`Paciente eliminado correctamente`, "ClinicData");
      this.getListPatients(); // Actualiza la lista de pacientes después de la eliminación
    });

  }

get totalPages(): number {
  return Math.ceil(this._patientService.patients.length / this.pageSize);
}

get totalPagesArray(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

get paginatedPatients() {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  return this._patientService.patients.slice(start, end);
}

goToPage(page: number): void {
  this.currentPage = page;
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}}
