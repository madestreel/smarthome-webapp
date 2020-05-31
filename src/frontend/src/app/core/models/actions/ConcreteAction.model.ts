import {ActionStyle} from "./action.model";
import {DefaultDevice} from "../devices/DefaultDevice.model";
import axios from 'axios'
import {AuthenticationService} from "../../services/authentication.service";
import {DeviceService} from "../../services/DeviceService.service";

export class Action {
  style : ActionStyle;
  action: string;
  actionName: string;
  topic: string;
  waitForResponse: boolean;
  statusWp: boolean;

  data : any;

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
    this.style = action.style ? (<any> ActionStyle)[action.style.toUpperCase()] : ActionStyle.SUCCESS;

    this.data = {
      token: this.authService.getCurrentUser().token,
      topic: this.topic,
      action: this.action,
      status: this.device.device.status,
      deviceID: this.device.device.id
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
}
