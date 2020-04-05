import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../core/services/authentication.service";
import {User} from "../../core/models/user.model";
import {Permission} from "../../core/models/permission.model";

@Component({
  templateUrl: "./about.component.html",
})

export class About implements OnInit {

  currentUser: User;
  Permission = Permission;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser()
  }
}
