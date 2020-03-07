import {Component, Input} from "@angular/core";
import {AbstractDevice} from "../../../core/models/devices/device.model";

@Component({
  selector: "devices",
  templateUrl: "./devices.component.html",
  styleUrls: [
    "./devices.component.scss"
  ]
})

export class Devices {
  @Input()
  devices: AbstractDevice[] = [];
}
