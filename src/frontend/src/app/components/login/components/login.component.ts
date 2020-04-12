import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: "login-form",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.scss"
  ]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ]))
    });
  }

  onSubmit(data) {
    console.log(data.uname);
    this.authService.login(data.username, data.password).catch(_ => {
      this.loginForm.reset()
    })
  }
}
