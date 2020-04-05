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
        Validators.minLength(6)
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(6),
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]+$')
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
