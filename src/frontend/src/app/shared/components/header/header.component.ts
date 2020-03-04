import {Component} from "@angular/core";
import {RoutesConfig} from "../../../configs/routes.config";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: [
    './header.component.scss'
  ]
})

export class HeaderComponent {
  routes = RoutesConfig.routesName;

  constructor(public auth: AuthenticationService) {
  }
}
