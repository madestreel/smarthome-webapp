export enum ActionStyle {
  DANGER="danger",
  SUCCESS="success",
  PRIMARY="primary",
  WARNING="warning"
}

export interface ActionModel {
  action: string;
  actionName: string;
  topic: string;
  statusWp: boolean;
  waitForResponse: boolean;
  style: ActionStyle;
}
