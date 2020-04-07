import {Component, Input, OnInit} from "@angular/core";
import {Room} from "../../../../../core/models/room.model";
import { Permission } from 'src/app/core/models/permission.model';

@Component({
  selector: "room-quickview",
  templateUrl: "./room.quickview.html",
  styleUrls: [
    "./room.quickview.scss"
  ]
})

export class RoomQuickView implements OnInit {
  @Input()
  room: Room;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.room)
  }

  Permission = Permission
}
