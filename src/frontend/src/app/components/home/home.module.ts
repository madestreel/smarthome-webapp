import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {HomePageComponent} from "./home-page.component";
import {AuthGuard} from "../../core/services/auth-guard.service";
import {HomeRoutingModule} from "./home-routing.module";
import {AuthenticationService} from "../../core/services/authentication.service";

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomePageComponent,
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ]
})

export class HomeModule {

}
