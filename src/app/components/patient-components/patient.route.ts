import { Routes } from '@angular/router';

export default[
    {
        path:'',
        loadComponent: () => 
            import('./patient-list/patient-list.component').then(
                (m) =>m.PatientListComponent
            )
    },
    {
        path:'add',
        loadComponent: () => 
            import('./patient-form-add/patient-form-add.component').then(
                (m) =>m.PatientFormComponent
            )
    },
    {
        path:'edit/:id',
        loadComponent: () => 
            import('./patient-form-add/patient-form-add.component').then(
                (m) =>m.PatientFormComponent
            )
    }
] as Routes;