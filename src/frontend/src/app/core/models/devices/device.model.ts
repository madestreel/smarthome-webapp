import {Action} from "../actions/ConcreteAction.model";
import {Permission} from "../permission.model";

export interface Device {
  status: string;
  actions: Action[];
  favorite: boolean;
  name: string;
  permission: Permission;
  id: string;
  roomID: string;
}

