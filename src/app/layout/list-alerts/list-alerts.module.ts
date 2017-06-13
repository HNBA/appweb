import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAlertsComponent } from './list-alerts.component';
import { ListAlertsRoutingModule } from './list-alerts-routing.module';
import { PageHeaderModule } from './../../shared';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        HttpModule,
        JsonpModule,
        ListAlertsRoutingModule
    ],
    declarations: [ListAlertsComponent]
})
export class listAlertsModule { }