import {Permission} from "./permission.model";

export interface User {
  username: string;
  token: string;
  permission: Permission;
}
