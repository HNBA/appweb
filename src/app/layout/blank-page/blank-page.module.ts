import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [BlankPageComponent],
  providers: [],
  bootstrap: [BlankPageComponent]
})
export class BlankPageModule { }
