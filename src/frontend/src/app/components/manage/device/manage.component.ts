import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {Action} from "../../../core/models/actions/ConcreteAction.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {ActivatedRoute} from "@angular/router";
import {DeviceService} from "../../../core/services/DeviceService.service";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {DefaultDevice} from "../../../core/models/devices/DefaultDevice.model";
import {Permission} from 'src/app/core/models/permission.model';
import {EmptyDevice} from "../../../core/models/devices/EmptyDevice.model";

@Component({
    templateUrl: './manage.component.html',
    styleUrls: [
        '../manage.component.scss'
    ]
})

export class ManageDevice implements OnInit {
    manageDeviceForm: FormGroup;
    actions: Action[] = [];
    device: DefaultDevice = new EmptyDevice(this.deviceService);
    Permission = Permission;

    constructor(
        private alert: FlashMessagesService,
        private route: ActivatedRoute,
        private deviceService: DeviceService,
        private authenticationService: AuthenticationService
    ) {
    }

    keys(): Array<string> {
        var keys = Object.keys(Permission);
        return keys.slice(keys.length/2);
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");
        this.deviceService.getDevice(id).then(res => {
            this.device = res.data.device;
            this.device.device.actions.forEach(action => {
                this.actions.push(new Action(this.authenticationService, this.deviceService, this.device, action))
            });
            this.manageDeviceForm.setControl("name", new FormControl(this.device.device.name));
            this.manageDeviceForm.setControl("permission", new FormControl(this.device.device.permission))
        });
        this.manageDeviceForm = new FormGroup(({
            actions: new FormControl(),
            name: new FormControl(),
            permission: new FormControl()
        }));
    }

    removeAction(index) {
        this.actions.splice(index, 1);
    }

    onUpdateDevice(data) {
        data.actions = [];
        this.actions.forEach(action => {
            let realAction;
            if (action instanceof Action) realAction = action;
            else realAction = new Action(this.authenticationService, this.deviceService, this.device, action);
            data.actions.push(realAction.getModel())
        });
        this.deviceService.updateDevice(data);
    }
}