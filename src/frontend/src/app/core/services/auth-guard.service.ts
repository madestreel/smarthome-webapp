import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import {map, take} from 'rxjs/operators';
import {RoutesConfig} from "../../configs/routes.config";
import {Permission} from "../models/permission.model";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    let permission: Permission = route.data.permission;
    return this.userService.isAuthenticated.pipe((take(1)), map(logged => {
      if (!logged || (permission && this.userService.getCurrentUser().permission < permission)) {
        this.router.navigate([RoutesConfig.routesName.login])
      }
      return logged || (permission && this.userService.getCurrentUser().permission >= permission || !permission)
    }))
  }
}
