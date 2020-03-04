import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import {map, take} from 'rxjs/operators';
import {RoutesConfig} from "../configs/routes.config";

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
    return this.userService.isAuthenticated.pipe((take(1)), map(logged => {
      if (!logged) {
        this.router.navigate([RoutesConfig.routesName.login])
      }
      return logged
    }))
  }
}
