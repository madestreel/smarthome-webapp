import {Component, Input} from "@angular/core";
import {Device} from "../../../../../core/models/devices/device.model";
import {Permission} from "../../../../../core/models/permission.model";

@Component({
  selector: "device-quickview",
  templateUrl: "./device.quickview.html",
  styleUrls: [
    "./device.quickview.scss"
  ]
})

export class DeviceQuickView {
  @Input()
  device: Device

  Permission = Permission
}
