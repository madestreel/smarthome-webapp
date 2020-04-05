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
import {Rooms} from "./components/rooms/rooms.component";
import {RoomComponent} from "./components/rooms/room/room.component";
import {RoomQuickView} from "./components/rooms/room/quickview/room.quickview";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ShowAuthedDirective,
    DeviceComponent,
    ActionComponent,
    DeviceQuickView,
    Devices,
    Rooms,
    RoomComponent,
    RoomQuickView
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
    Devices,
    Rooms,
    DeviceComponent,
    DeviceQuickView
  ]
})

export class SharedModule {

}
