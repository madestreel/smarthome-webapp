import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/';
import {map, take} from 'rxjs/operators';
import {AuthenticationService} from "../../core/services/authentication.service";
import {RoutesConfig} from "../../configs/routes.config";

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private userService: AuthenticationService
  ) {
  }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    return this.userService.isAuthenticated.pipe(take(1), map(isAuth => {
      if (isAuth) {
        this.router.navigate(RoutesConfig.routesName.home)
      }
      return !isAuth
    }));
  }
}
