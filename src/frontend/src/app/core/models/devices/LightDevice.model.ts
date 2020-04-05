import {Device} from "./device.model";
import {DeviceService} from "../../services/DeviceService.service";
import {DefaultDevice} from "./DefaultDevice.model";

export class LightDevice extends DefaultDevice {

  constructor(private deviceService: DeviceService, device: Device) {
    super(deviceService, device)
  }
}
