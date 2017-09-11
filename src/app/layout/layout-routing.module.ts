import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
<<<<<<< HEAD
{
path: '', component: LayoutComponent,
children: [
//{ path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
//{ path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
{ path: 'dashboard', loadChildren: './tables/tables.module#TablesModule' },
//{ path: 'forms', loadChildren: './form/form.module#FormModule' },
//{ path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
//{ path: 'grid', loadChildren: './grid/grid.module#GridModule' },
{ path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
{ path: 'alertes', loadChildren: './list-alerts/list-alerts.module#listAlertsModule' },
{ path: 'details', loadChildren: './details/details.module#DetailsModule' },
]
}
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class LayoutRoutingModule {}

=======
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'alerts', loadChildren: './list-alerts/list-alerts.module#listAlertsModule' }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
