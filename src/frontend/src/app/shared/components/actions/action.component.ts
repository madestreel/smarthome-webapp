import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ActionStyle} from "../../../core/models/actions/action.model";
import {Action} from "../../../core/models/actions/ConcreteAction.model";
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {EmptyAction} from "../../../core/models/actions/EmptyAction";
import {DeviceService} from "../../../core/services/DeviceService.service";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
    selector: 'action',
    templateUrl: './action.component.html',
    styleUrls: [
        './action.component.scss'
    ]
})

export class ActionComponent implements OnInit {
    actionForm: FormGroup;
    ActionStyle = ActionStyle;

    @Input()
    title: string = "";

    @Input()
    color: string;

    @Input()
    buttonTitle: string = "Create action";

    @Input()
    disabled: boolean = true;

    @Input()
    action: Action = new EmptyAction(this.authenticationService, this.deviceService);

    @Output()
    onButtonClick: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private deviceService: DeviceService,
        private authenticationService: AuthenticationService
    ) {
    }

    keys(): Array<string> {
        return Object.keys(ActionStyle)
    }

    ngOnInit(): void {
        this.actionForm = new FormGroup({
            action: new FormControl({value: this.action.action, disabled: this.disabled}, Validators.compose([
                Validators.required
            ])),
            actionName: new FormControl({value: this.action.actionName, disabled: this.disabled}, Validators.compose([
                Validators.required
            ])),
            topic: new FormControl({value: this.action.topic, disabled: this.disabled}),
            waitForResponse: new FormControl({value: true, disabled: this.disabled}),
            statusWp: new FormControl({value: true, disabled: this.disabled}),
            style: new FormControl({value: ActionStyle.SUCCESS, disabled: this.disabled})
        })
    }

    onButtonClicked(data) {
        this.onButtonClick.emit([data]);
        console.log(this.action);
        this.action.update(data);
    }
}