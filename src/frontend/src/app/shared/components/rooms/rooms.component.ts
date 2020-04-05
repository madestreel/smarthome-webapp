import {Component, Input} from "@angular/core";
import {Room} from "../../../core/models/room.model";

@Component({
  selector: "rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: [
    "./rooms.component.scss"
  ]
})

export class Rooms {
  @Input()
  rooms: Room[] = []
}
