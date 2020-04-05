import {Component, Input} from "@angular/core";
import {DefaultDevice} from "../../../core/models/devices/DefaultDevice.model";

@Component({
  selector: "devices",
  templateUrl: "./devices.component.html",
  styleUrls: [
    "./devices.component.scss"
  ]
})

export class Devices {
  @Input()
  devices: DefaultDevice[] = [];
}
