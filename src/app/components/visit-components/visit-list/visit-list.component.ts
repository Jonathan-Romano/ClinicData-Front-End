import { Component, inject } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Visit } from '../../../interfaces/visit';
import { Patient } from '../../../interfaces/patient';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visit-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './visit-list.component.html',
  styleUrl: './visit-list.component.css'
})
export class VisitListComponent {
  public _patientService= inject(PatientService);
  private toastr= inject(ToastrService);

  //Paginado
  public currentPage: number = 1;
  public pageSize: number = 6;


  getVisitView(id: number){
    this._patientService.getVisitById(id).subscribe((response: Visit) =>{
      console.log(response.id);
      this._patientService.visitView = response;
      console.log(this._patientService.visitView)
    })
  }


  changePatientId(id: number):void{
    this._patientService.patientId = id;
    console.log(this._patientService.patientId)
  }

  deleteVisit(id: number, patientId: number) {
    this._patientService.deleteVisit(id).subscribe(() => {

      // actualizar lista (como ya lo hacés)
      this._patientService.patientView.visits =
        this._patientService.patientView.visits.filter(v => v.id !== id);

      // 🔥 CLAVE: ajustar paginado
      this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    });
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
   //Paginado
    get totalPages(): number {
      return Math.ceil(this._patientService.patientView.visits.length / this.pageSize);
    }

    get totalPagesArray(): number[] {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    get paginatedVisits() {
      const visits = this._patientService.patientView.visits || [];
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return visits.slice(start, end);
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
    }


}

