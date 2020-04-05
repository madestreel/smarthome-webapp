import {Permission} from "./permission.model";
import {DefaultDevice} from "./devices/DefaultDevice.model";

export interface Room {
  name: string;
  roomID: string;
  permission: Permission;
  devices: DefaultDevice[];
  favorite: boolean;
}
