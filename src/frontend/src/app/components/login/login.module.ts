import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {LoginComponent} from "./components/login.component";
import {LoginPageComponent} from "./pages/login-page.component";
import {NoAuthGuard} from "./no-auth-guard.service";
import {LoginRoutingModule} from "./login-routing.module";
import {AuthenticationService} from "../../core/services/authentication.service";

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
  ],
  declarations: [
    LoginComponent,
    LoginPageComponent,
  ],
  providers: [NoAuthGuard, AuthenticationService]
})

export class LoginModule {
}
