import {Injectable} from "@angular/core";
import {AbstractDevice} from "../models/devices/device.model";
import {LightDevice} from "../models/devices/LightDevice.model";
import {Permission} from "../models/permission.model";
import {SwitchAction} from "../models/actions/SwitchAction.model";


@Injectable()
export class DeviceService {

  switch(device: AbstractDevice) {
    console.log("on switch");
    device.device.status = device.device.status === "ON" ? "OFF" : "ON"
  }

  fetchDevices(devices: AbstractDevice[]) {
    console.log("fetch devices");
    const device1: AbstractDevice = new LightDevice(this, {
      name: "Main light 1",
      status: "ON",
      actions: [],
      favorite: false,
      type: "light",
      permission: Permission.USER,
      id: "1"
    });
    const device2: AbstractDevice = new LightDevice(this, {
      name: "Main light 2",
      status: "ON",
      actions: [],
      favorite: true,
      type: "light",
      permission: Permission.USER,
      id: "2"
    });
    const device3: AbstractDevice = new LightDevice(this, {
      name: "Main light 3",
      status: "ON",
      actions: [],
      favorite: true,
      type: "light",
      permission: Permission.USER,
      id: "3"
    });
    const device4: AbstractDevice = new LightDevice(this, {
      name: "Main light 4",
      status: "OFF",
      actions: [],
      favorite: false,
      type: "light",
      permission: Permission.USER,
      id: "4"
    });
    device1.addAction(new SwitchAction(this, device1));
    device2.addAction(new SwitchAction(this, device2));
    device3.addAction(new SwitchAction(this, device3));
    device4.addAction(new SwitchAction(this, device4));

    devices.push(device1);
    devices.push(device2);
    devices.push(device3);
    devices.push(device4);
  }
}
