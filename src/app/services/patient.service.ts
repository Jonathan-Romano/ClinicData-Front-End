import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Patient } from '../interfaces/patient';
import { Visit } from '../interfaces/visit';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private http = inject(HttpClient);
  private endPoint = environment.endpoint;
  private apiUrl = '/patient/'
  private apiUrlVisit = '/visit/'

  public patients: Patient[] = [];

  public patientId: number = 0;

  public patientView: Patient = {
    id: 0,
    name: "del Paciente",
    lastName: "del Paciente",
    email: "example@domain.com",
    phone: 1234567890,
    dni: 12345678,
    visitList: [] // Lista de visitas asociadas al paciente
  };

  public visitView: Visit ={
    id: 0,
    date: '',
    description: '',
    treatment: '',
    patient: {
      id: 0,
    }
  }

  constructor() { }


  //METODOS DE PACIENTES

  //metodos GET----------------------------------------------------------------
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.endPoint}${this.apiUrl}list`);
  }

  getPatientsByName(name: string): Observable<Patient[]> {
    
    console.log(`${this.endPoint}${this.apiUrl}search?name=${name}`)
    return this.http.get<Patient[]>(`${this.endPoint}${this.apiUrl}search?name=${name}`);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.endPoint}${this.apiUrl}${id}`)
  }


  
//metodos POST/DELETE/PUT------------------------------------------------------

  createPatient(patient: Patient): Observable<number> {
    return this.http.post<number>(`${this.endPoint}${this.apiUrl}create`, patient, {
      responseType: 'text' as 'json'
    });
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.endPoint}${this.apiUrl}edit/${patient.id}`, patient, {
      responseType: 'text' as 'json'
    });
  }

  deletePatient(id: number): Observable<String> {
    return this.http.delete<String>(`${this.endPoint}${this.apiUrl}delete/${id}`, {
      responseType: 'text' as 'json'
    });
  }


  //METODOS DE VISITAS
  getVisitById(id: number): Observable<Visit> {
    return this.http.get<Visit>(`${this.endPoint}${this.apiUrlVisit}${id}`)
  }

  createVisit(visit: Visit): Observable<number> {
    return this.http.post<number>(`${this.endPoint}${this.apiUrlVisit}create`, visit, {
      responseType: 'text' as 'json'
    });
  }

  updateVisit(visit: Visit): Observable<Visit> {
    return this.http.put<Visit>(`${this.endPoint}${this.apiUrlVisit}edit/${visit.id}`, visit, {
      responseType: 'text' as 'json'
    });
  }

  deleteVisit(id: number): Observable<String>{
    
    return this.http.delete<String>(`${this.endPoint}${this.apiUrlVisit}delete/${id}`, {
      responseType: 'text' as 'json'
    });
  }


}
