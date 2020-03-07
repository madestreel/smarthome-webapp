import {Component, Input} from "@angular/core";
import {AbstractDevice} from "../../../core/models/devices/device.model";
import {LightDevice} from "../../../core/models/devices/LightDevice.model";
import {SwitchAction} from "../../../core/models/actions/SwitchAction.model";
import {DeviceService} from "../../../core/services/DeviceService.service";
import {Permission} from "../../../core/models/permission.model";

@Component({
  selector: "devices",
  templateUrl: "./devices.component.html",
  styleUrls: [
    "./devices.component.scss"
    ]
})

export class Devices {
  @Input()
  devices: AbstractDevice[] = [];

  constructor(private deviceService: DeviceService) {
    const device1: AbstractDevice = new LightDevice(this.deviceService, {
      name: "Main light 1",
      status: "ON",
      actions: [],
      favorite: false,
      type: "light",
      permission: Permission.USER,
      id: "1"
    });
    const device2: AbstractDevice = new LightDevice(this.deviceService, {
      name: "Main light 2",
      status: "ON",
      actions: [],
      favorite: false,
      type: "light",
      permission: Permission.USER,
      id: "2"
    });
    const device3: AbstractDevice = new LightDevice(this.deviceService, {
      name: "Main light 3",
      status: "ON",
      actions: [],
      favorite: false,
      type: "light",
      permission: Permission.USER,
      id: "3"
    });
    const device4: AbstractDevice = new LightDevice(this.deviceService, {
      name: "Main light 4",
      status: "OFF",
      actions: [],
      favorite: false,
      type: "light",
      permission: Permission.USER,
      id: "4"
    });
    device1.addAction(new SwitchAction(deviceService, device1));
    device2.addAction(new SwitchAction(deviceService, device2));
    device3.addAction(new SwitchAction(deviceService, device3));
    device4.addAction(new SwitchAction(deviceService, device4));

    this.devices.push(device1);
    this.devices.push(device2);
    this.devices.push(device3);
    this.devices.push(device4)
  }
}
