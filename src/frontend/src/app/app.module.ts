import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomePageComponent} from "./home/home-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login/components/login.component";
import {LoginPageComponent} from "./login/pages/login-page.component";
import {Error404Component} from "./error/404/error404.component";
import {AuthenticationService} from "./services/authentication.service";
import {HeaderComponent} from "./header/header.component";
import {JwtService} from "./services/jwt.service";
import {AuthGuard} from "./services/auth-guard.service";
import {ShowAuthedDirective} from "./header/show-authed.directive";
import {NoAuthGuard} from "./login/no-auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    LoginComponent,
    Error404Component,
    HeaderComponent,
    ShowAuthedDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService, JwtService, AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
