import {Component, Input} from "@angular/core";
import {Action} from "../../../../core/models/actions/ConcreteAction.model";

@Component({
  selector: "actionButton",
  templateUrl: './actionButton.component.html',
  styleUrls: [
    './actionButton.component.scss'
  ]
})

export class ActionButtonComponent {
  @Input()
  action: Action;
}
