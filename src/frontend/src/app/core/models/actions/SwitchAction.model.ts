import {Action, ActionStyle, ActionType} from "./action.model";
import {DeviceService} from "../../services/DeviceService.service";
import {Device} from "../devices/device.model";

export class SwitchAction implements Action {
  action: Function = () => this.deviceService.switch(this.device);
  style: ActionStyle = ActionStyle.SUCCESS;
  type: ActionType = ActionType.SWITCH;

  constructor(private deviceService: DeviceService, private device: Device) {
  }
}
