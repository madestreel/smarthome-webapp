import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShowAuthedDirective} from "./directives/show-authed.directive";
import {AuthenticationService} from "../core/services/authentication.service";
import {JwtService} from "../core/services/jwt.service";
import {ReactiveFormsModule} from "@angular/forms";
import {DeviceComponent} from "./components/device/device.component";
import {ActionComponent} from "./components/actions/action.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ShowAuthedDirective,
    DeviceComponent,
    ActionComponent
  ],
  providers: [
    AuthenticationService,
    JwtService
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    ShowAuthedDirective,
    DeviceComponent,
    ActionComponent
  ]
})

export class SharedModule {

}
