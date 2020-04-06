import {OffAction, OnAction, SwitchAction} from "./ConcreteAction.model";
import {ActionType} from "./action.model";
import {DefaultDevice} from "../devices/DefaultDevice.model";
import {AuthenticationService} from "../../services/authentication.service";

export class ActionBuilder {
  static createAction(action: any, auth: AuthenticationService, device: DefaultDevice) {
    const actionType: ActionType = (<any>ActionType)[action.action.toUpperCase()];
    switch (actionType) {
      case ActionType.SWITCH:
        return new SwitchAction(auth, device, action.actionName);
      case ActionType.OFF:
        return new OffAction(auth, device, action.actionName);
      case ActionType.ON:
        return new OnAction(auth, device, action.actionName);
      default:
        return undefined;
    }
  }
}
