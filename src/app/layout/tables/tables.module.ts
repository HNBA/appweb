import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Plotter} from '../../plotter';
import { TablesComponent } from './tables.component';
import { TablesRoutingModule } from './tables-routing.module';
import { PageHeaderModule } from './../../shared';
import {Printer} from '../../printer';
import { HttpModule, JsonpModule } from '@angular/http';

@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        PageHeaderModule,
        HttpModule,
        JsonpModule
    ],
    declarations: [TablesComponent,Plotter,Printer]
})
export class TablesModule { }
