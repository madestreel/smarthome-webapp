import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Permission} from "../../core/models/permission.model";
import {DeviceService} from "../../core/services/DeviceService.service";
import {DefaultDevice} from "../../core/models/devices/DefaultDevice.model";
import {RoomService} from "../../core/services/RoomService.service";
import {User} from "../../core/models/user.model";
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
    templateUrl: './manage.component.html',
    styleUrls: [
        "./manage.component.scss"
    ]
})

export class Manage implements OnInit {
    newDeviceForm: FormGroup;
    newRoomForm: FormGroup;
    newUserForm: FormGroup;
    Permission = Permission;

    keys(): Array<string> {
        var keys = Object.keys(Permission);
        return keys.slice(keys.length / 2);
    }

    actions: any = [];
    devices: DefaultDevice[] = [];
    users: User[] = [];

    constructor(
        private deviceService: DeviceService,
        private roomService: RoomService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.newDeviceForm = new FormGroup({
            id: new FormControl("", Validators.compose([
                Validators.required
            ])),
            permission: new FormControl("", Validators.compose([
                Validators.required
            ]))
        });
        this.newRoomForm = new FormGroup(({
            roomName: new FormControl("", Validators.compose([
                Validators.required
            ])),
            roomPermission: new FormControl("", Validators.compose([
                Validators.required
            ])),
            devices: new FormControl(""),
            users: new FormControl("")
        }));
        this.newUserForm = new FormGroup({
            username: new FormControl("", Validators.compose([
                Validators.required
            ])),
            password: new FormControl("", Validators.compose([
                Validators.required,
                Validators.minLength(4)
            ])),
            password2: new FormControl("", Validators.compose([
                Validators.required,
                Validators.minLength(4)
            ])),
            userPermission: new FormControl("", Validators.compose([
                Validators.required
            ]))
        }, {validators: this.checkPasswords});
        this.deviceService.fetchAllDevices(this.devices);
        this.authenticationService.fetchUsers(this.users)
    }

    checkPasswords(group: FormGroup) {
        let pass = group.get('password').value;
        let confirmPass = group.get('password2').value;

        return pass === confirmPass ? null : {notSame: true}
    }

    onSubmit(data) {
        console.log(data);
        this.deviceService.createDevice({
            id: data.id,
            permission: data.permission,
            actions: this.actions
        });
        this.devices.push(new DefaultDevice(this.deviceService, {
            status: "",
            actions: [],
            favorite: false,
            name: data.id,
            permission: Permission.USER,
            id: data.id,
            roomID: ""
        }));
        this.newDeviceForm.reset();
        this.actions = []
    }

    onSubmitRoom(data) {
        this.roomService.createRoom({
            roomName: data.roomName,
            permission: data.roomPermission,
            devices: data.devices,
            users: data.users
        });
        this.newDeviceForm.reset()
    }

    removeAction(index) {
        this.actions.splice(index, 1);
    }

    onSubmitUser(data) {
        console.log(data);
        this.authenticationService.createUser({
            username: data.username,
            password: data.password,
            permission: data.userPermission
        });
        this.users.push({
            username: data.username,
            token: "",
            permission: data.userPermission
        });
        this.newUserForm.reset()
    }
}
