import {Inject, Injectable, InjectionToken, NgModule, Optional} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {ENVIRONMENT} from "./services/environment.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [{ provide: ENVIRONMENT, useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
