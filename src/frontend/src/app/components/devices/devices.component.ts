import {Component, OnInit} from "@angular/core";
import {DeviceService} from "../../core/services/DeviceService.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {User} from "../../core/models/user.model";
import {DefaultDevice} from "../../core/models/devices/DefaultDevice.model";

@Component({
  templateUrl: "./devices.component.html"
})

export class Devices implements OnInit {
  devices: DefaultDevice[] = [];
  currentUser: User;

  constructor(private deviceService: DeviceService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.deviceService.fetchDevices(this.devices);
    this.currentUser = this.authenticationService.getCurrentUser();
  }
}
