import {Device} from "./device.model";
import {Action} from "../actions/action.model";
import {DeviceService} from "../../services/DeviceService.service";

export class LightDevice implements Device {
  actions: Action[] = [];
  favorite: boolean;
  name: string;
  status: string;
  type: string = "light";

  constructor(private deviceService: DeviceService, name: string) {
    this.name = name;
  }

  setStatus(status: string) {
    this.status = status;
  }

  switchFavorite() {
    this.favorite = !this.favorite
  }

  addAction(action: Action) {
    this.actions.push(action)
  }
}
