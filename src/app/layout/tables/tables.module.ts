
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Plotter} from '../../plotter';
import { TablesComponent } from './tables.component';
import { TablesRoutingModule } from './tables-routing.module';
import { PageHeaderModule } from './../../shared';
import {Printer} from '../../printer';
import { HttpModule, JsonpModule } from '@angular/http';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { ChartModule } from 'angular2-highcharts';
declare var require: any;
@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        PageHeaderModule,
        HttpModule,
        Ng2Charts,
        ChartModule.forRoot(require('highcharts/highstock')),
        JsonpModule
    ],
    declarations: [TablesComponent,Plotter,Printer]
})
export class TablesModule { }
