import {Device} from "./device.model";
import {Permission} from "../permission.model";
import {DefaultDevice} from "./DefaultDevice.model";
import {DeviceService} from "../../services/DeviceService.service";

export class EmptyDevice extends DefaultDevice{
    device: Device;
    constructor(private deviceServices: DeviceService) {
        super(deviceServices,
        {
            name: "",
            permission: Permission.USER,
            id: "",
            roomID: "",
            favorite: false,
            status: "",
            actions: []
        })
    }
}
