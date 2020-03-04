import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: "login-form",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.scss"
  ]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: 'username',
      password: 'password'
    })
  }

  onSubmit(data) {
    this.loginForm.setValue({username: "username", password: "password"});
    this.authService.login(data.username, data.password)
  }
}
