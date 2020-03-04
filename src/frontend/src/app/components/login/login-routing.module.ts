import {RouterModule, Routes} from "@angular/router";
import {RoutesConfig} from "../../configs/routes.config";
import {LoginPageComponent} from "./pages/login-page.component";
import {NoAuthGuard} from "./no-auth-guard.service";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: '', component: LoginPageComponent, canActivate: [NoAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginRoutingModule {
}
