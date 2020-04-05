import {Component, Input} from "@angular/core";
import {DeviceService} from "../../../../core/services/DeviceService.service";
import {DefaultDevice} from "../../../../core/models/devices/DefaultDevice.model";

@Component({
  selector: "device",
  templateUrl: "device.component.html",
  styleUrls: [
    './device.component.scss'
  ]
})

export class DeviceComponent {
  @Input()
  device: DefaultDevice;

  constructor(private deviceService: DeviceService) {
  }
}
