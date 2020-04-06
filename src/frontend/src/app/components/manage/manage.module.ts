import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {AuthGuard} from "../../core/services/auth-guard.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {RoomService} from "../../core/services/RoomService.service";
import {DeviceService} from "../../core/services/DeviceService.service";
import {Manage} from "./manage.component";
import {ManageRoutingModule} from "./manage-routing.module";
import {ActionForm} from "./action/action.component";

@NgModule({
  imports: [
    SharedModule,
    ManageRoutingModule
  ],
  declarations: [
    Manage,
    ActionForm
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    RoomService,
    DeviceService
  ]
})

export class ManageModule {}
