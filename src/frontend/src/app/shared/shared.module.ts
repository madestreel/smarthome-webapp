import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShowAuthedDirective} from "./directives/show-authed.directive";
import {AuthenticationService} from "../core/services/authentication.service";
import {JwtService} from "../core/services/jwt.service";
import {ReactiveFormsModule} from "@angular/forms";
import {DeviceComponent} from "./components/devices/device/device.component";
import {ActionComponent} from "./components/actions/action.component";
import {DeviceQuickView} from "./components/devices/device/quickview/device.quickview";
import {Devices} from "./components/devices/devices.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ShowAuthedDirective,
    DeviceComponent,
    ActionComponent,
    DeviceQuickView,
    Devices
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
    ActionComponent,
    DeviceQuickView,
    Devices
  ]
})

export class SharedModule {

}
