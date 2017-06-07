import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';
import { PageHeaderModule } from './../../shared';
import { HttpModule, JsonpModule } from '@angular/http';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        GridRoutingModule,
        PageHeaderModule,
        HttpModule,
        JsonpModule,
        Ng2Charts
    ],
    declarations: [GridComponent]
})
export class GridModule { }
