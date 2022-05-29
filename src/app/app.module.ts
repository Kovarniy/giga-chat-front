import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {ENVIRONMENT} from "./services/environment.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

import { LoginFormComponent } from './components/authorization/login-form/login-form.component';
import { AppComponent } from './app.component';
import {RegisterFormComponent} from "./components/authorization/register-form/register-form.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {TestChatComponent} from "./components/chat/test-chat/test-chat.component";
import {IsAuthGuard} from "./guards/is-auth-guard.service";
import { ProfileComponent } from './components/profile/profile.component';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';

const appRoutes: Routes = [
  { path: 'chats',
    component: TestChatComponent,
    canActivate: [ IsAuthGuard ]
  },
  { path: 'auth', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    PageNotFoundComponent,
    LoginFormComponent,
    TestChatComponent,
    ChatMessageComponent,
    TestChatComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: ENVIRONMENT, useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
