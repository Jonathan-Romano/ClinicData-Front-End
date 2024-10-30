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

  deleteVisit(id: number, idP: number){
    console.log("click")
    this._patientService.deleteVisit(id).subscribe((response: String) =>{
      this.toastr.warning(`Visita eliminada correctamente`, "ClinicData");
      console.log(idP)
      this.getPatientView(idP)
    })   
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

}

