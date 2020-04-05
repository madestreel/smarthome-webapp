import {Component, OnInit} from "@angular/core";
import {DeviceService} from "../../core/services/DeviceService.service";
import {AbstractDevice} from "../../core/models/devices/device.model";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html'
})

export class HomePageComponent implements OnInit {

  devices: AbstractDevice[] = [];

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.deviceService.fetchDevices(this.devices)
  }

  getFavoriteDevices() {
    return this.devices.filter(device => device.device.favorite)
  }
}
