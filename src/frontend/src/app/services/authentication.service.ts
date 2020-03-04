import {Injectable} from "@angular/core";
import axios from 'axios';

@Injectable()
export class AuthenticationService {

  login(username: string, password: string) {
    axios.get(`/api/login/user/${username}/password/${password}`).then(res => {
      console.log(res.data);
      window.localStorage.setItem("user", JSON.stringify({username: username, token: res.data.token}));
    }).catch(err => {
      console.error(err.message);
      window.localStorage.clear()
    })
  }
}
