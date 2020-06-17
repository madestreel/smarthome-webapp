import {Component, Input} from "@angular/core";
import {EmptyAction} from "../../../core/models/actions/EmptyAction";
import {Action} from "../../../core/models/actions/ConcreteAction.model";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {DeviceService} from "../../../core/services/DeviceService.service";
import {DefaultDevice} from "../../../core/models/devices/DefaultDevice.model";

@Component({
  selector: "actionForm",
  templateUrl: "./action.component.html",
  styleUrls: [
    "./action.component.scss"
  ]
})

export class ActionForm {
  emptyAction: Action = new EmptyAction(this.authenticationService, this.deviceService);

  @Input()
  actions: any = [];

  @Input()
  device: DefaultDevice;

  constructor(
      private authenticationService: AuthenticationService,
      private deviceService: DeviceService
  ) {
  }

  addAction(data) {
    data.topic = data.topic ? data.topic : data.actionName;
    this.actions.push(data)
  }
}
