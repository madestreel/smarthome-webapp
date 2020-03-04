import {Injectable} from "@angular/core";
import axios from 'axios';
import {Router} from "@angular/router";
import {RoutesConfig} from "../../configs/routes.config";
import {BehaviorSubject, ReplaySubject} from 'rxjs';

import {JwtService} from './jwt.service';
import {User} from '../models/user.model';
import {distinctUntilChanged} from 'rxjs/operators';
import {Permission} from "../models/permission.model";


@Injectable()
export class AuthenticationService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      axios.get('api/user')
        .then(
          data => this.setAuth({username: "arthut", permission:Permission.USER, token:"token"}),
        ).catch(_ => {
        this.purgeAuth()
      });
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
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
    axios.get(`/api/login/user/${username}/password/${password}`).then(res => {
      console.log(res.data);
      this.setAuth({token: res.data.token, username:"arthur", permission:Permission.USER});
      this.router.navigate([RoutesConfig.routesName.home])
    }).catch(err => {
      console.error(err.message);
      this.purgeAuth()
    })
  }

  logout() {
    this.purgeAuth()
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}
