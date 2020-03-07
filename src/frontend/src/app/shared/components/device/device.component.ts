import {Component, Input} from "@angular/core";
import {Device} from "../../../core/models/devices/device.model";
import {DeviceService} from "../../../core/services/DeviceService.service";
import {LightDevice} from "../../../core/models/devices/LightDevice.model";
import {SwitchAction} from "../../../core/models/actions/SwitchAction.model";

@Component({
  selector: "device",
  templateUrl: "device.component.html",
  styleUrls: [
    './device.component.scss'
  ]
})

export class DeviceComponent {
  @Input()
  device: Device;

  constructor(private deviceService: DeviceService) {
    this.device = new LightDevice(deviceService, "Main light");
    this.device.addAction(new SwitchAction(deviceService, this.device));
    this.device.addAction(new SwitchAction(deviceService, this.device));
    this.device.addAction(new SwitchAction(deviceService, this.device));
    this.device.setStatus("ON")
  }
}
