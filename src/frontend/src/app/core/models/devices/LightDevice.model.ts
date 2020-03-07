import {AbstractDevice} from "./device.model";
import {DeviceService} from "../../services/DeviceService.service";
import {Permission} from "../permission.model";

export class LightDevice extends AbstractDevice {

  constructor(private deviceService: DeviceService, name: string) {
    super(deviceService, {
      name: name,
      status: "",
      actions: [],
      favorite: false,
      type: "light",
      permission: Permission.USER,
      id: "1"
    });
  }
}
