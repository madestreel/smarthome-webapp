import {Component, Input} from "@angular/core";
import {AbstractDevice} from "../../../../core/models/devices/device.model";
import {DeviceService} from "../../../../core/services/DeviceService.service";
import {LightDevice} from "../../../../core/models/devices/LightDevice.model";
import {SwitchAction} from "../../../../core/models/actions/SwitchAction.model";

@Component({
  selector: "device",
  templateUrl: "device.component.html",
  styleUrls: [
    './device.component.scss'
  ]
})

export class DeviceComponent {
  @Input()
  device: AbstractDevice;

  constructor(private deviceService: DeviceService) {
  }
}
