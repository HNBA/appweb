import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  declarations: [LoginComponent]
})
export class LoginModule { }
