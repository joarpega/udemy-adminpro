import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

/**
 * @Resume rutas para el sidebar, todas las rutas tiene una propiedad llamada 'data'
 */
const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'acount-settings', component: AcountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

/** @resume Constante que contiene las rutas hijas de la navegacion de las paginas (rutas hijas) */
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
