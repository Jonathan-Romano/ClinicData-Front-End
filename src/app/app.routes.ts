import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import("./pages/router.principal")
    },
    {
        path: 'patient',
        loadChildren: () => import("./components/patient-components/patient.route")
    },
    {
        path: 'visit',
        loadChildren: () => import("./components/visit-components/visit.route")
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
