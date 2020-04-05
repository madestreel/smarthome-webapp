import {DeviceService} from "../../services/DeviceService.service";
import {SwitchAction} from "./SwitchAction.model";
import {ActionType} from "./action.model";
import {DefaultDevice} from "../devices/DefaultDevice.model";

export class ActionBuilder {
  static createAction(actionType: ActionType, deviceService: DeviceService, device: DefaultDevice) {
    switch (actionType) {
      case ActionType.SWITCH:
        return new SwitchAction(deviceService, device);
      default:
        return undefined;
    }
  }
}
