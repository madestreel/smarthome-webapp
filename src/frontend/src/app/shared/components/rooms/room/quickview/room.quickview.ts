import {Component, Input} from "@angular/core";
import {Room} from "../../../../../core/models/room.model";
import { Permission } from 'src/app/core/models/permission.model';

@Component({
  selector: "room-quickview",
  templateUrl: "./room.quickview.html",
  styleUrls: [
    "./room.quickview.scss"
  ]
})

export class RoomQuickView {
  @Input()
  room: Room;

  Permission = Permission
}
