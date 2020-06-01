import {Action} from "./ConcreteAction.model";
import {AuthenticationService} from "../../services/authentication.service";
import {DeviceService} from "../../services/DeviceService.service";
import {EmptyDevice} from "../devices/EmptyDevice.model";

export class EmptyAction extends Action {
    constructor(
        authenticationService: AuthenticationService,
        deviceService: DeviceService
    ) {
        super(authenticationService, deviceService, new EmptyDevice(deviceService), {
            actionName: "",
            action: "",
            topic: ""
        });
    }
}