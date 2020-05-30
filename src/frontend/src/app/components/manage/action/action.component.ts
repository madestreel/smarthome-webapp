import {Component, Input, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActionStyle} from "../../../core/models/actions/action.model";

@Component({
  selector: "actionForm",
  templateUrl: "./action.component.html",
  styleUrls: [
    "./action.component.scss"
  ]
})

export class ActionForm implements OnInit {
  actionForm: FormGroup;
  ActionStyle = ActionStyle;

  @Input()
  actions: any = [];

  keys(): Array<string> {
    return Object.keys(ActionStyle)
  }

  ngOnInit(): void {
    this.actionForm = new FormGroup({
      action: new FormControl("", Validators.compose([
        Validators.required
      ])),
      actionName: new FormControl("", Validators.compose([
        Validators.required
      ])),
      topic: new FormControl(),
      waitForResponse: new FormControl(true),
      statusWp: new FormControl(true),
      style: new FormControl(ActionStyle.SUCCESS)
    })
  }

  addAction(data) {
    this.actions.push(data)
  }
}
