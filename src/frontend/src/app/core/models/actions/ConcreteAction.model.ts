import {ActionModel, ActionStyle} from "./action.model";
import {DefaultDevice} from "../devices/DefaultDevice.model";
import axios from 'axios'
import {AuthenticationService} from "../../services/authentication.service";
import {DeviceService} from "../../services/DeviceService.service";

export class Action implements ActionModel {
  style: ActionStyle;
  action: string;
  actionName: string;
  topic: string;
  waitForResponse: boolean;
  statusWp: boolean;

  data: any;

  constructor(
      private authService: AuthenticationService,
      private deviceService: DeviceService,
      private device: DefaultDevice,
      action: any) {
    this.actionName = action.actionName;
    this.action = action.action;
    this.topic = action.topic ? action.topic : device.device.id;
    this.waitForResponse = action.waitForResponse ? action.waitForResponse : true;
    this.statusWp = action.statusWp ? action.statusWp : false;
    this.style = action.style ? (<any>ActionStyle)[action.style.toUpperCase()] : ActionStyle.SUCCESS;

    this.data = {
      token: this.authService.getCurrentUser().token,
      topic: this.topic,
      action: this.action,
      status: this.device.device.status,
      id: this.device.device.id
    };
  }

  execute() {
    const name = this.actionName;
    this.actionName = this.waitForResponse == true ? "sending..." : this.actionName;
    axios.post(`api/action/action`, this.data).then(res => {
      this.actionName = name;
      this.device.device.status = res.data.value;
      if (this.statusWp == true) {
        this.deviceService.getDevice(this.device.device.id).then(dev => {
          const device = dev.data.device;
          device.device.status = res.data.value;
          this.deviceService.updateDevice(device.device);
        });
      }
    })
  };

  update(data: any) {
    this.actionName = data.actionName ? data.actionName : this.actionName;
    this.action = data.action ? data.action : this.action;
    this.topic = data.topic ? data.topic : this.topic;
    this.statusWp = data.statusWp ? data.statusWp : this.statusWp;
    this.waitForResponse = data.waitForResponse ? data.waitForResponse : this.waitForResponse;
    this.style = data.style ? data.style : this.style;
  }

  getModel() {
    return {
      action: this.action,
      actionName: this.actionName,
      topic: this.topic,
      waitForResponse: this.waitForResponse,
      statusWp: this.statusWp,
      style: this.style
    }
  }
}
