import {DeviceService} from "../../services/DeviceService.service";
import {Action} from "../actions/ConcreteAction.model";
import {Device} from "./device.model";

export class DefaultDevice {
  device: Device;

  constructor(private deviceService: DeviceService, device: Device) {
    this.device = device;
  }

  addAction(action: Action) {
    console.log(this.device);
    this.device.actions.push(action)
  }

  setStatus(status: string) {
    this.device.status = status
  }

  switchFavorite() {
    //this.device.favorite = !this.device.favorite
    this.deviceService.switchFav(this.device)
  }

  setFav(fav: boolean) {
    this.device.favorite = fav
  }
}
