import {Component, OnInit} from "@angular/core";
import {User} from "../../core/models/user.model";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Room} from "../../core/models/room.model";
import {RoomService} from "../../core/services/RoomService.service";

@Component({
  templateUrl: "./rooms.component.html"
})

export class Rooms implements OnInit {
  rooms: Room[] = [];
  currentUser: User;

  constructor(private roomService: RoomService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.roomService.fetchRooms(this.rooms);
    this.currentUser = this.authenticationService.getCurrentUser();
  }
}
