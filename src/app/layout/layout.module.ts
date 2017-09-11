import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent } from '../shared';
<<<<<<< HEAD

=======
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
<<<<<<< HEAD
        SidebarComponent,
            ]
=======
        SidebarComponent        
    ]
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
})
export class LayoutModule { }
