import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { PatientListComponent } from '../../components/patient-components/patient-list/patient-list.component';
import { PatientComponent } from '../../components/patient-components/patient/patient.component';
import { FooterComponent } from '../../shared/footer/footer.component';
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    NavbarComponent,
    PatientListComponent,
    PatientComponent,
    FooterComponent
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

}
