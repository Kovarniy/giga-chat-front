import {Inject, Injectable, InjectionToken, NgModule, Optional} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {ConfigurationService} from "./services/configuration.service";
import {ENVIRONMENT} from "./services/environment.service";

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
    ReactiveFormsModule
  ],
  providers: [{ provide: ENVIRONMENT, useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
