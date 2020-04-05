import {Injectable} from "@angular/core";
import axios from 'axios';
import {Permission} from "../models/permission.model";
import {AuthenticationService} from "./authentication.service";
import {User} from "../models/user.model";
import {Action, ActionType} from "../models/actions/action.model";
import {ActionBuilder} from "../models/actions/ActionBuilder.model";
import {DefaultDevice} from "../models/devices/DefaultDevice.model";
import {Device} from "../models/devices/device.model";


@Injectable()
export class DeviceService {

  constructor(
    private authenticationService: AuthenticationService
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

  switch(device: DefaultDevice) {
    console.log("on switch");
    device.device.status = device.device.status === "ON" ? "OFF" : "ON"
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
              (<any>ActionType)[action.toUpperCase()],
              this,
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
}
