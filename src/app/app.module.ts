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
import {ChatFormComponent} from "./components/chat-application/chat-form/chat-form.component";
import {IsAuthGuard} from "./guards/is-auth-guard.service";
import { ProfileComponent } from './components/profile/profile.component';
import { ChatMessageComponent } from './components/chat-application/chat-form/chat-message/chat-message.component';
import { ChatBarComponent } from './components/chat-application/chat-bar/chat-bar.component';
import { AvatarComponent } from './components/common/avatar/avatar.component';
import { ChatTextNamePipe } from './pipes/chat-text-name.pipe';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { ChatApplicationComponent } from './components/chat-application/chat-application.component';
import {IsNotAuthGuard} from "./guards/is-not-auth.guard";
import { PrivateChatsComponent } from './components/chat-application/chat-bar/private-chats/private-chats.component';
import { ChatFieldComponent } from './components/chat-application/chat-bar/chat-field/chat-field.component';

const appRoutes: Routes = [
  { path: 'chat-application',
    component: ChatApplicationComponent,
    canActivate: [ IsAuthGuard ]
  },
  { path: 'authorization',
    component: AuthorizationComponent,
    canActivate: [ IsNotAuthGuard ]
  },
  { path: '',
    component: ChatApplicationComponent,
    canActivate: [IsAuthGuard]
  },
  { path: '**',
    component: PageNotFoundComponent,
    canActivate: [IsAuthGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    PageNotFoundComponent,
    LoginFormComponent,
    ChatFormComponent,
    ChatMessageComponent,
    ProfileComponent,
    ChatBarComponent,
    AvatarComponent,
    ChatTextNamePipe,
    AuthorizationComponent,
    ChatApplicationComponent,
    PrivateChatsComponent,
    ChatFieldComponent
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
