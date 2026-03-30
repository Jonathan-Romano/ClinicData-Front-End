import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../interfaces/patient';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
  dni: number = 0;

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
  this.searchForm.get('search')?.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe((value) => {
      const searchValue = value?.toString().trim() || '';

      if (searchValue === '') {
        this._patientService.getPatients().subscribe((response: Patient[]) => {
          this._patientService.patients = response.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          );
        });
        return;
      }

      if (!isNaN(Number(searchValue))) {
        this._patientService.getPatientByDni(Number(searchValue)).subscribe((response: Patient[]) => {
          this._patientService.patients = response;
        });
      } else {
        this._patientService.getPatientsByName(searchValue).subscribe((response: Patient[]) => {
          this._patientService.patients = response;
        });
      }
    });
}

}
