export enum ActionType {
  SWITCH= "switch"
}

export enum ActionStyle {
  DANGER="danger",
  SUCCESS="success",
  PRIMARY="primary",
  WARNING="warning"
}

export interface Action {
  type: ActionType,
  style: ActionStyle,
  action: Function
}
