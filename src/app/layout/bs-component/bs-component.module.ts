import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NglModule } from 'ng-lightning/ng-lightning';
// relative import
import { BsComponentRoutingModule } from './bs-component-routing.module';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsComponentComponent } from './bs-component.component';
import {
    AlertComponent,
    ButtonsComponent,
    ModalComponent,
    CollapseComponent,
    DatePickerComponent,
    DropdownComponent,
    PaginationComponent,
    PopOverComponent,
    ProgressbarComponent,
    TabsComponent,
    TooltipComponent,
    TimepickerComponent,
} from './components';
import { PageHeaderModule } from '../../shared';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule,
        BsComponentRoutingModule,
        NglModule.forRoot(),
        ToastModule.forRoot()
        
    ],
    declarations: [
        BsComponentComponent,
        ButtonsComponent,
        AlertComponent,
        ModalComponent,
        CollapseComponent,
        DatePickerComponent,
        DropdownComponent,
        PaginationComponent,
        PopOverComponent,
        ProgressbarComponent,
        TabsComponent,
        TooltipComponent,
        TimepickerComponent
    ]
})
export class BsComponentModule { }
