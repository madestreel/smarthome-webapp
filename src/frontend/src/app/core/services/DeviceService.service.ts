import {Injectable} from "@angular/core";
import axios from 'axios';
import {Permission} from "../models/permission.model";
import {AuthenticationService} from "./authentication.service";
import {User} from "../models/user.model";
import {Action} from "../models/actions/action.model";
import {ActionBuilder} from "../models/actions/ActionBuilder.model";
import {DefaultDevice} from "../models/devices/DefaultDevice.model";
import {Device} from "../models/devices/device.model";
import {FlashMessagesService} from "angular2-flash-messages";


@Injectable()
export class DeviceService {

  constructor(
    private authenticationService: AuthenticationService,
    private alert: FlashMessagesService
  ) {
  }

  switchFav(device: Device) {
    const user: User = this.authenticationService.getCurrentUser();
    if (device.favorite) {
      axios.delete(`api/device/fav`, {
        data: {
          token: user.token,
          userID: user.username,
          deviceID: device.id
        }
      }).then(_ => {
        device.favorite = false
      })
    } else {
      axios.post(`api/device/fav`, {
        token: user.token,
        userID: user.username,
        deviceID: device.id
      }).then(_ => {
        device.favorite = true
      })
    }

  }

  fetchDevicesForRoom(devices: DefaultDevice[], roomID: string) {
    const user: User = this.authenticationService.getCurrentUser();
    axios.get(`api/device/devices/${roomID}`, {params: {token: user.token}}).then(res => {
      res.data.devices.forEach(device => {
        axios.get(`api/device/device/${device}`, {params: {token: user.token}}).then(res => {
          console.log(res.data);
          const device1: DefaultDevice = new DefaultDevice(this, {
            name: res.data.device.device.name,
            status: res.data.device.device.value,
            actions: [],
            favorite: false,
            permission: (<any>Permission)[res.data.device.device.permission.toUpperCase()],
            id: res.data.device._id,
            roomID: roomID
          });
          console.log(res.data.device.device);
          res.data.device.device.actions.forEach(action => {
            const concreteAction: Action = ActionBuilder.createAction(
              action,
              this.authenticationService,
              device1
            );
            if (concreteAction) device1.addAction(concreteAction)
          });
          devices.push(device1);
          axios.get(`api/device/fav/device/${res.data.device._id}/user/${user.username}`, {params: {token: user.token}}).then(res => {
            device1.setFav(res.data.isfav)
          })
        })
      });

    })
  }

  fetchDevices(devices: DefaultDevice[]) {
    const user: User = this.authenticationService.getCurrentUser();

    axios.get(`api/room/rooms/${user.username}`, {params: {token: user.token}})
      .then(res => {
        console.log(res.data.rooms);
        res.data.rooms.forEach(room => {
          this.fetchDevicesForRoom(devices, room);
        })
      });
  }

  displayAlert(msg: string, type: string) {
    this.alert.show(msg, {cssClass: `alert-${type}`, dismiss:true, timeout: 2000, showCloseBtn: true, closeOnClick: true});
  }

  filter(s) {
    return s.replace(/ |'|\"/g, '');
  }
  createDevice(device: any) {
    axios.post(`api/device/device`, {
      token: this.authenticationService.getCurrentUser().token,
      device: {
        permission: device.permission,
        actions: device.actions,
        name: device.deviceID,
        deviceID: this.filter(device.deviceID)
      }
    }).then(_ => {
      this.displayAlert("Device successfully created!", "success")
    }).catch(_ => {
      this.displayAlert("Failed to create device!", "danger")
    })
  }

  addDeviceToRoom(roomID: string, deviceID: string) {
    axios.post(`api/device/room`, {
      roomID: this.filter(roomID),
      deviceID: this.filter(deviceID),
      token: this.authenticationService.getCurrentUser().token
    })
  }
}
