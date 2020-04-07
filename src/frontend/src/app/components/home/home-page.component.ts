import {Component, OnInit} from "@angular/core";
import {DeviceService} from "../../core/services/DeviceService.service";
import {DefaultDevice} from "../../core/models/devices/DefaultDevice.model";
import {Room} from "../../core/models/room.model";
import {RoomService} from "../../core/services/RoomService.service";
import {Router} from "@angular/router";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html'
})

export class HomePageComponent implements OnInit {

  devices: DefaultDevice[] = [];
  rooms: Room[] = [];

  constructor(private deviceService: DeviceService, private roomService: RoomService) {
  }

  ngOnInit() {
    this.deviceService.fetchDevices(this.devices);
    this.roomService.fetchRooms(this.rooms);
  }

  getFavoriteDevices() {
    return this.devices.filter(device => device.device.favorite)
  }

  getFavoriteRooms() {
    return this.rooms.filter(room => room.favorite)
  }
}
