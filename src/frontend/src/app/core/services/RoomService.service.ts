import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {User} from "../models/user.model";
import axios from 'axios';
import {DeviceService} from "./DeviceService.service";
import {Room} from "../models/room.model";
import {Permission} from "../models/permission.model";

@Injectable()
export class RoomService {
  constructor(private authenticationService: AuthenticationService, private deviceService: DeviceService) {
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
