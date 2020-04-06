import {DeviceService} from "../../services/DeviceService.service";
import {SwitchAction} from "./SwitchAction.model";
import {ActionType} from "./action.model";
import {DefaultDevice} from "../devices/DefaultDevice.model";
import {AuthenticationService} from "../../services/authentication.service";

export class ActionBuilder {
  static createAction(action: any, auth: AuthenticationService, device: DefaultDevice) {
    const actionType: ActionType = (<any>ActionType)[action.action.toUpperCase()];
    switch (actionType) {
      case ActionType.SWITCH:
        return new SwitchAction(auth, device, action.actionName);
      default:
        return undefined;
    }
  }
}
