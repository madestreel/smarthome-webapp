import {Component, OnInit} from "@angular/core";
import {RoutesConfig} from "../../../configs/routes.config";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {Permission} from "../../../core/models/permission.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: [
    './header.component.scss'
  ]
})

export class HeaderComponent implements OnInit {
  routes = RoutesConfig.routesName;
  Permission = Permission;
  logged: boolean = false;

  constructor(public auth: AuthenticationService) {
  }

  ngOnInit(): void {
    this.auth.isAuthenticated.subscribe(
        logged => {
          this.logged = logged;//d === login && permission <= this.auth.getCurrentUser().permission;
        })
  }

  canShow(login: boolean = true, permission: Permission = Permission.USER) {
    return this.logged === login && permission <= this.auth.getCurrentUser().permission;
  }
}
