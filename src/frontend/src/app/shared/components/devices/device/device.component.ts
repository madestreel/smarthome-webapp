import {Component, Input, OnInit} from "@angular/core";
import {DefaultDevice} from "../../../../core/models/devices/DefaultDevice.model";
import {Permission} from "../../../../core/models/permission.model";
import {RoutesConfig} from "../../../../configs/routes.config";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {Router} from "@angular/router";
import {Action} from "../../../../core/models/actions/ConcreteAction.model";
import {ActionStyle} from "../../../../core/models/actions/action.model";
import {DeviceService} from "../../../../core/services/DeviceService.service";

@Component({
  selector: "device",
  templateUrl: "device.component.html",
  styleUrls: [
    './device.component.scss'
  ]
})

export class DeviceComponent implements OnInit {
  @Input()
  device: DefaultDevice;

  constructor(
      private authenticationService: AuthenticationService,
      private deviceService: DeviceService,
      private router: Router) {
  }

  ngOnInit() {
    if (this.isAdmin()) {
      const action: Action = new Action(
          this.authenticationService,
          this.deviceService,
          this.device,
          {
            actionName: "manage",
            action: "",
            style: ActionStyle.PRIMARY
          }
      );
      action.execute = () => {
        this.router.navigate([RoutesConfig.routesName.manage + "/device", this.device.device.id])
      };
      this.device.addAction(action)
    }
  }

  isAdmin() {
    return this.authenticationService.getCurrentUser().permission >= Permission.ADMIN
  }
}
