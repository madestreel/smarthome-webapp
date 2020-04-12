import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {User} from "../models/user.model";
import axios from 'axios';
import {DeviceService} from "./DeviceService.service";
import {Room} from "../models/room.model";
import {Permission} from "../models/permission.model";
import {FlashMessagesService} from "angular2-flash-messages";

@Injectable()
export class RoomService {
  constructor(private alert: FlashMessagesService, private authenticationService: AuthenticationService, private deviceService: DeviceService) {
  }

  switchFav(room: Room) {
    const user: User = this.authenticationService.getCurrentUser();
    if (room.favorite) {
      axios.delete(`api/room/fav`, {
        data: {
          token: user.token,
          userID: user.username,
          roomID: room.roomID
        }
      }).then(_ => {
        room.favorite = false
      })
    } else {
      axios.post(`api/room/fav`, {
        token: user.token,
        userID: user.username,
        roomID: room.roomID
      }).then(_ => {
        room.favorite = true
      })
    }
  }

  displayAlert(msg: string, type: string) {
    this.alert.show(msg, {cssClass: `alert-${type}`, dismiss:true, timeout: 2000, showCloseBtn: true, closeOnClick: true});
  }

  createRoom(room: any) {
    axios.post(`api/room/room`, {
      token: this.authenticationService.getCurrentUser().token,
      room: {
        permission: room.permission,
        name: room.roomName,
        roomID: this.filter(room.roomName)
      }
    }).then(_ => {
      this.displayAlert("Room successfully created!", "success")
    }).catch(_ => {
      this.displayAlert("Failed to create room!", "danger")
    });
    for (let device of room.devices) {
      this.deviceService.addDeviceToRoom(room.roomName, device)
    }
    for (let user of room.users) {
      this.addUserToRoom(user, room.roomName)
    }
    this.addUserToRoom("root", room.roomName);
  }

  addUserToRoom(user, room) {
    axios.post(`api/room/user`, {
      roomID: this.filter(room),
      userID: user,
      token: this.authenticationService.getCurrentUser().token
    })
  }

  filter(s) {
    return s.replace(/ |'|\"/g, '');
  }

  fetchRooms(rooms: Room[]) {
    const user: User = this.authenticationService.getCurrentUser();

    axios.get(`api/room/rooms/${user.username}`, {params: {token: user.token}}).then(res => {
      res.data.rooms.forEach(room => {
        axios.get(`api/room/room/${room}`, {params: {token: user.token}}).then(res => {
          const room1: Room = {
            roomID: room,
            name: res.data.room.name,
            permission: (<any>Permission)[res.data.room.permission.toUpperCase()],
            devices: [],
            favorite: false
          };
          rooms.push(room1);
          axios.get(`api/room/fav/room/${room}/user/${user.username}`, {params: {token: user.token}}).then(res => {
            room1.favorite = res.data.isfav
          })
        })
      })
    })
  }
}
