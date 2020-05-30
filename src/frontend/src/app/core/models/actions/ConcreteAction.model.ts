import {ActionStyle} from "./action.model";
import {DefaultDevice} from "../devices/DefaultDevice.model";
import axios from 'axios'
import {AuthenticationService} from "../../services/authentication.service";

export class Action {
  style : ActionStyle;
  actionType: string;
  name: string;
  topic: string;
  waitForResponse: boolean;
  statusWp: boolean;

  data : any;
  constructor(
      private authService: AuthenticationService,
      private device: DefaultDevice,
      action: any) {
    this.name = action.actionName;
    this.actionType = action.action;
    this.topic = action.hasOwnProperty("topic") ? action.topic : device.device.id;
    this.waitForResponse = action.hasOwnProperty("waitForResponse") ? action.waitForResponse : true;
    this.statusWp = action.hasOwnProperty('statusWp') ? action.statusWp : false;
    this.style = action.hasOwnProperty("style") ? (<any> ActionStyle)[action.style.toUpperCase()] : ActionStyle.SUCCESS;

    this.data = {
      token: this.authService.getCurrentUser().token,
      topic: this.topic,
      action: this.actionType,
      status: this.device.device.status
    };
  }

  action() {
    const name = this.name;
    this.name = this.waitForResponse ? "sending..." : this.name;
    axios.post(`api/action/action`, this.data).then(res => {
      this.name = name;
      this.device.device.status = res.data.value;
      if (this.statusWp) {
        axios.post(`api/device/update`, this.data).then(res => {
          console.log(res)
        })
      }
    })
  };
}
