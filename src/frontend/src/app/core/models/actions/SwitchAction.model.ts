import {Action, ActionStyle, ActionType} from "./action.model";
import {DeviceService} from "../../services/DeviceService.service";
import {DefaultDevice} from "../devices/DefaultDevice.model";
import axios from 'axios'
import {AuthenticationService} from "../../services/authentication.service";

export class SwitchAction implements Action {
  action: Function = () => {
    axios.post(`api/action/action`, {
      token: this.authService.getCurrentUser().token,
      topic: this.device.device.id,
      action: 'switch'
    }).then(res => {
      this.device.device.status = res.data.value
    })
  };
  style: ActionStyle = ActionStyle.SUCCESS;
  type: ActionType = ActionType.SWITCH;
  name: string;

  constructor(private authService: AuthenticationService, private device: DefaultDevice, name: string) {
    this.name = name ? name : this.type;
  }
}
