import {DeviceService} from "../../services/DeviceService.service";
import {SwitchAction} from "./SwitchAction.model";
import {ActionType} from "./action.model";
import {DefaultDevice} from "../devices/DefaultDevice.model";

export class ActionBuilder {
  static createAction(action: any, deviceService: DeviceService, device: DefaultDevice) {
    const actionType: ActionType = (<any>ActionType)[action.action.toUpperCase()];
    switch (actionType) {
      case ActionType.SWITCH:
        return new SwitchAction(deviceService, device, action.actionName);
      default:
        return undefined;
    }
  }
}
