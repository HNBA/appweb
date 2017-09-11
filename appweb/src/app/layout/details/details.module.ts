import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';
import { PushNotificationComponent } from './notification.component';

import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {SimpleNotificationsModule} from 'angular2-notifications';
@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        JsonpModule,
        DetailsRoutingModule
    ],
    declarations: [DetailsComponent,PushNotificationComponent]
})
export class DetailsModule {}
