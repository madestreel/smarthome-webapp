import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DefaultDevice} from "../../../core/models/devices/DefaultDevice.model";
import {User} from "../../../core/models/user.model";
import {DeviceService} from "../../../core/services/DeviceService.service";
import {RoomService} from "../../../core/services/RoomService.service";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  templateUrl: './manage.component.html',
  styleUrls: [
    "./manage.component.scss"
  ]
})

export class ManageRoom implements OnInit {
  manageRoomForm: FormGroup;
  devices: DefaultDevice[] = [];
  users: User[] = [];
  roomID: string;

  constructor(private alert: FlashMessagesService, private route: ActivatedRoute, private deviceService: DeviceService, private roomService: RoomService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.manageRoomForm = new FormGroup(({
      devices: new FormControl(""),
      users: new FormControl("")
    }));
    this.deviceService.fetchAllDevices(this.devices);
    this.authenticationService.fetchUsers(this.users);
    this.roomID = this.route.snapshot.paramMap.get('roomID');
  }

  displayAlert(msg: string, type: string) {
    this.alert.show(msg, {cssClass: `alert-${type}`, dismiss:true, timeout: 2000, showCloseBtn: true, closeOnClick: true});
  }

  onUpdateRoom(data) {
    for (let device of data.devices) {
      this.deviceService.addDeviceToRoom(this.roomID, device)
    }
    for (let user of data.users) {
      console.log(user)
      this.roomService.addUserToRoom(user, this.roomID)
    }
    this.displayAlert("Room successfully updated", "success");
    this.manageRoomForm.reset()
  }
}
