import {Action, ActionStyle, ActionType} from "./action.model";
import {DeviceService} from "../../services/DeviceService.service";
import {DefaultDevice} from "../devices/DefaultDevice.model";

export class SwitchAction implements Action {
  action: Function = () => this.deviceService.switch(this.device);
  style: ActionStyle = ActionStyle.SUCCESS;
  type: ActionType = ActionType.SWITCH;
  name: string;

  constructor(private deviceService: DeviceService, private device: DefaultDevice, name: string) {
    this.name = name ? name : this.type;
  }
}
