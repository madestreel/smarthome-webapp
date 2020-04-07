import {Component, Input, OnInit} from "@angular/core";
import {Room} from "../../../../core/models/room.model";
import {RoomService} from "../../../../core/services/RoomService.service";
import {DeviceService} from "../../../../core/services/DeviceService.service";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {Permission} from "../../../../core/models/permission.model";
import {Router} from "@angular/router";
import {RoutesConfig} from "../../../../configs/routes.config";

@Component({
  selector: "room",
  templateUrl: "room.component.html",
  styleUrls: [
    "./room.component.scss"
  ]
})

export class RoomComponent implements OnInit {
  selected: boolean;
  @Input()
  room: Room;

  constructor(
    private roomService: RoomService,
    private deviceService: DeviceService,
    private authenticationService: AuthenticationService,
    private router: Router) {
  }

  ngOnInit() {
    this.deviceService.fetchDevicesForRoom(this.room.devices, this.room.roomID)
  }

  switchFavorite() {
    this.roomService.switchFav(this.room)
  }

  onClick() {
    this.selected = !this.selected;
  }

  isAdmin() {
    return this.authenticationService.getCurrentUser().permission >= Permission.ADMIN
  }

  manage() {
    this.router.navigate([RoutesConfig.routesName.manage + "/room", this.room.roomID])
  }
}
