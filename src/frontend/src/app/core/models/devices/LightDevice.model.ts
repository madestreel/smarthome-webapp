import {AbstractDevice, Device} from "./device.model";
import {DeviceService} from "../../services/DeviceService.service";

export class LightDevice extends AbstractDevice {

  constructor(private deviceService: DeviceService, device: Device) {
    super(deviceService, device)
  }
}
