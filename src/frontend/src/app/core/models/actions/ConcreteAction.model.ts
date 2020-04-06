import {Action, ActionStyle, ActionType} from "./action.model";
import {DefaultDevice} from "../devices/DefaultDevice.model";
import axios from 'axios'
import {AuthenticationService} from "../../services/authentication.service";

export class SwitchAction implements Action {
  action: Function = () => {
    const name = this.name;
    this.name = "sending...";
    axios.post(`api/action/action`, {
      token: this.authService.getCurrentUser().token,
      topic: this.device.device.id,
      action: 'switch'
    }).then(res => {
      this.name = name;
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

export class OffAction implements Action {
  action: Function = () => {
    const name = this.name;
    this.name = "sending...";
    axios.post(`api/action/action`, {
      token: this.authService.getCurrentUser().token,
      topic: this.device.device.id,
      action: 'off'
    }).then(res => {
      this.name = name;
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

export class OnAction implements Action {
  action: Function = () => {
    const name = this.name;
    this.name = "sending...";
    axios.post(`api/action/action`, {
      token: this.authService.getCurrentUser().token,
      topic: this.device.device.id,
      action: 'on'
    }).then(res => {
      this.name = name;
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
