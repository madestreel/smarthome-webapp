import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthenticationService} from "../core/services/authentication.service";
import {JwtService} from "../core/services/jwt.service";
import {ReactiveFormsModule} from "@angular/forms";
import {DeviceComponent} from "./components/devices/device/device.component";
import {ActionButtonComponent} from "./components/actions/button/actionButton.component";
import {DeviceQuickView} from "./components/devices/device/quickview/device.quickview";
import {Devices} from "./components/devices/devices.component";
import {Rooms} from "./components/rooms/rooms.component";
import {RoomComponent} from "./components/rooms/room/room.component";
import {RoomQuickView} from "./components/rooms/room/quickview/room.quickview";
import {DeviceService} from "../core/services/DeviceService.service";
import {ActionComponent} from "./components/actions/action.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DeviceComponent,
    ActionButtonComponent,
    DeviceQuickView,
    Devices,
    Rooms,
    RoomComponent,
    RoomQuickView,
    ActionComponent
  ],
  providers: [
    AuthenticationService,
    DeviceService,
    JwtService,
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    DeviceComponent,
    ActionButtonComponent,
    DeviceQuickView,
    Devices,
    Rooms,
    DeviceQuickView,
    ActionComponent
  ]
})

export class SharedModule {

}
