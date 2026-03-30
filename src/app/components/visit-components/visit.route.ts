import { Routes } from '@angular/router';

export default [
  {
    path: 'add/:patientId',
    loadComponent: () =>
      import('../visit-components/visit-form-add-edit/visit-form-add-edit.component').then(
        (m) => m.VisitFormAddEditComponent
      )
  },
  {
    path: 'edit/:visitId',
    loadComponent: () =>
      import('../visit-components/visit-form-add-edit/visit-form-add-edit.component').then(
        (m) => m.VisitFormAddEditComponent
      )
  },
] as Routes;
