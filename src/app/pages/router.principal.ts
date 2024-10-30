import { Routes } from '@angular/router';

export default[
    {
        path:'',
        loadComponent: () => 
            import('./principal/principal.component').then(
                (m) =>m.PrincipalComponent
            )
    },
    

] as Routes;