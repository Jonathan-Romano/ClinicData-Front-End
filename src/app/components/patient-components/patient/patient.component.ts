import { Component, inject } from '@angular/core';
import { Patient } from '../../../interfaces/patient';
import { PatientService } from '../../../services/patient.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VisitListComponent } from '../../visit-components/visit-list/visit-list.component';
import { VisitComponent } from '../../visit-components/visit/visit.component';
import { PhoneFormatPipe } from '../../../shared/pipes/phone-format.pipe';
import { DniFormatPipe } from '../../../shared/pipes/dni-format.pipe';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    VisitListComponent,
    VisitComponent,
    PhoneFormatPipe,
    DniFormatPipe 
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {

  public _patientService= inject(PatientService);
}
