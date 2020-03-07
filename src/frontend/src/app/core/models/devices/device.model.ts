import {Action} from "../actions/action.model";

export interface Device {
  type: string,
  status: string,
  actions: Action[],
  favorite: boolean,
  name: string,
  addAction: Function,
  setStatus: Function,
  switchFavorite: Function
}
