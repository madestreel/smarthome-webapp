import {Component, Input, OnInit} from "@angular/core";
import {Room} from "../../../../core/models/room.model";
import {RoomService} from "../../../../core/services/RoomService.service";
import {DeviceService} from "../../../../core/services/DeviceService.service";

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

  constructor(private roomService: RoomService, private deviceService: DeviceService) {
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
}
