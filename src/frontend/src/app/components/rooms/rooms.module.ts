import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {AuthGuard} from "../../core/services/auth-guard.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {RoomsRoutingModule} from "./rooms-routing.module";
import {RoomService} from "../../core/services/RoomService.service";
import {Rooms} from "./rooms.component";

@NgModule({
  imports: [
    SharedModule,
    RoomsRoutingModule
  ],
  declarations: [
    Rooms
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    RoomService
  ]
})

export class RoomsModule {
}
