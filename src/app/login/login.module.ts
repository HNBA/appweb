import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
import { HttpModule, JsonpModule } from '@angular/http';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule }   from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    ReactiveFormsModule,
     ],
=======

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
  declarations: [LoginComponent]
})
export class LoginModule { }
