import {Injectable} from "@angular/core";
import {Device} from "../models/devices/device.model";

@Injectable()
export class DeviceService {

  switch(device: Device) {
    console.log("on switch");
    device.status = device.status === "ON" ? "OFF" : "ON"
  }
}
