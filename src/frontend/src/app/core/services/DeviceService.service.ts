import {Injectable} from "@angular/core";
import {AbstractDevice, Device} from "../models/devices/device.model";

@Injectable()
export class DeviceService {

  switch(device: AbstractDevice) {
    console.log("on switch");
    device.device.status = device.device.status === "ON" ? "OFF" : "ON"
  }
}
