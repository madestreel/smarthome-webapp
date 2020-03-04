import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShowAuthedDirective} from "./directives/show-authed.directive";
import {AuthenticationService} from "../core/services/authentication.service";
import {JwtService} from "../core/services/jwt.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ShowAuthedDirective
  ],
  providers: [
    AuthenticationService,
    JwtService
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    ShowAuthedDirective,
  ]
})

export class SharedModule {

}
