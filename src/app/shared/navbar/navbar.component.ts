import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../interfaces/patient';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private _patientService = inject(PatientService);

  searchForm: FormGroup;
  name: string = '';

  constructor(private fb: FormBuilder) {
    // Inicializar el formulario
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.observeSearchChanges(); // Llamar al método correctamente
  }

  // Método para observar cambios en el campo de búsqueda
  observeSearchChanges(): void {
    // Escuchar cambios en el control del formulario
    this.searchForm.get('search')?.valueChanges.subscribe((value) => {
        this.name = value;
        if(this.name != ""){
          console.log('Nombre ingresado:', this.name);
          this._patientService.getPatientsByName(this.name).subscribe((response: Patient[])=>{
              console.log(response[0]);
              this._patientService.patients = response;
          })
        }else{
          this._patientService.getPatients().subscribe((response: Patient[])=>{ 
            this._patientService.patients = response.sort((a, b) => {
              // Convertir a minúsculas para evitar problemas con las mayúsculas
              return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });; 
          
          });
        }   

    });
  }
}
