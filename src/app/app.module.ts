import { BrowserModule } from '@angular/platform-browser';
import {HttpModule, Http} from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import {ReactiveFormsModule} from '@angular/forms';
=======
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { PushNotificationsModule } from 'angular2-notifications';
import { BookService } from './book.service';
import { MaterialModule, MdButton } from '@angular/material';
import 'hammerjs';
import{ ToastModule} from 'ng2-toastr/ng2-toastr';
import { APP_BASE_HREF, Location } from '@angular/common';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
  
@NgModule({
    declarations: [
        AppComponent,
<<<<<<< HEAD
          ],
    imports: [
ReactiveFormsModule,
=======

    ],
    imports: [
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        PushNotificationsModule,
        BrowserModule,
<<<<<<< HEAD
        HttpModule,
        AppRoutingModule,
        MaterialModule,
        BrowserModule,
        FormsModule,
=======
        FormsModule,
        HttpModule,
        AppRoutingModule,
         MaterialModule,
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    providers: [AuthGuard,BookService,
    { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
