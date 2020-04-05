import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {DeviceService} from "../../core/services/DeviceService.service";
import {DevicesRoutingModule} from "./devices-routing.module";
import {Devices} from "./devices.component";
import {AuthGuard} from "../../core/services/auth-guard.service";
import {AuthenticationService} from "../../core/services/authentication.service";

@NgModule({
  imports: [
    SharedModule,
    DevicesRoutingModule
  ],
  declarations: [
    Devices
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    DeviceService
  ]
})

export class DevicesModule {}
