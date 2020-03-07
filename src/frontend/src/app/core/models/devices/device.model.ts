import {Action} from "../actions/action.model";
import {Permission} from "../permission.model";
import {DeviceService} from "../../services/DeviceService.service";

export interface Device {
  type: string;
  status: string;
  actions: Action[];
  favorite: boolean;
  name: string;
  permission: Permission;
  id: string;
}

export abstract class AbstractDevice {
  device: Device;

  protected constructor(deviceService: DeviceService, device: Device) {
    this.device = device;
  }

  addAction(action: Action) {
    this.device.actions.push(action)
  }

  setStatus(status: string) {
    this.device.status = status
  }

  switchFavorite() {
    this.device.favorite = !this.device.favorite
  }
}
