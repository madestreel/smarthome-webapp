import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Error404Component} from "./shared/components/error/404/error404.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import {SharedModule} from "./shared/shared.module";
import {HomeModule} from "./components/home/home.module";
import {LoginModule} from "./components/login/login.module";
import {DevicesModule} from "./components/devices/devices.module";

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    LoginModule,
    DevicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
