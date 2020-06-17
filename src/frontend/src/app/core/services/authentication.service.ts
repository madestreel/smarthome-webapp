import {Injectable} from "@angular/core";
import axios from 'axios';
import {Router} from "@angular/router";
import {RoutesConfig} from "../../configs/routes.config";
import {BehaviorSubject, ReplaySubject} from 'rxjs';

import {JwtService} from './jwt.service';
import {User} from '../models/user.model';
import {distinctUntilChanged} from 'rxjs/operators';
import {Permission} from "../models/permission.model";
import {FlashMessagesService} from "angular2-flash-messages";


@Injectable()
export class AuthenticationService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
      private jwtService: JwtService,
      private router: Router,
      private alert: FlashMessagesService
  ) {
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      axios.get('api/user/user', {params: {token: this.jwtService.getToken()}})
          .then(
              resp => this.setAuth({
                username: resp.data.user._id,
                permission: resp.data.user.permission.toUpperCase(),
                token: this.jwtService.getToken()
              }),
          ).catch(_ => {
        this.purgeAuth()
      });
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  fetchUsers(users: User[]) {
    axios.get(`api/user/users`, {params: {token: this.getCurrentUser().token}}).then(res => {
      res.data.users.forEach(user => {
        users.push({
          username: user._id,
          token: "",
          permission: user.permission.toUpperCase(),
        })
      })
    });
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    console.log(user);
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  login(username: string, password: string) {
    return axios.get(`/api/user/user/${username}/password/${password}`).then(res => {
      console.log(res.data);
      this.setAuth({username: username, permission: Permission.USER, token: res.data.token});
      this.populate();
      this.router.navigate([RoutesConfig.routesName.home])
    }).catch(err => {
      console.error(err.message);
      this.purgeAuth();
      throw new Error("failed to connect")
    })
  }

  logout() {
    this.purgeAuth()
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value.token ? this.currentUserSubject.value : {
      username: undefined,
      token: undefined,
      permission: Permission.USER
    };
  }

  displayAlert(msg: string, type: string) {
    this.alert.show(msg, {
      cssClass: `alert-${type}`,
      dismiss: true,
      timeout: 2000,
      showCloseBtn: true,
      closeOnClick: true
    });
  }

  createUser(param: { password: string; permission: string; username: string }) {
    axios.post('/api/user/user', {
      username: param.username,
      permission: param.permission,
      password: param.password,
      token: this.getCurrentUser().token
    }).then(_ => {
      this.displayAlert("User successfully created!", 'success')
    }).catch(_ => {
      this.displayAlert("Failed to create user!", 'danger')
    })
  }
}
