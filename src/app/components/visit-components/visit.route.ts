import { Routes } from '@angular/router';

export default[
    {
        path:'add',
        loadComponent: () => 
            import('../visit-components/visit-form-add-edit/visit-form-add-edit.component').then(
                (m) =>m.VisitFormAddEditComponent
            )
    },
    {
        path:'edit/:id',
        loadComponent: () => 
            import('../visit-components/visit-form-add-edit/visit-form-add-edit.component').then(
                (m) =>m.VisitFormAddEditComponent
            )
    },  
] as Routes;
