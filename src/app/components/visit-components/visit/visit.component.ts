import { Component, inject } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './visit.component.html',
  styleUrl: './visit.component.css'
})
export class VisitComponent {
  public _patientService = inject(PatientService);


  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
  }

  deleteVisit(id: number): void {
    this._patientService.deleteVisit(id).subscribe((response: String)=>{
    
    });
  }

  backPatient():void{
    this._patientService.visitView ={
      id: 0,
      date: '',
      description: '',
      treatment: '',
      patient: {
        id: 0
      }
    }
  }

  changePatientId(id: number):void{
    this._patientService.patientId = id;
  }

}