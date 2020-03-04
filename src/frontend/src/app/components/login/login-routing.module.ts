import {RouterModule, Routes} from "@angular/router";
import {RoutesConfig} from "../../configs/routes.config";
import {LoginPageComponent} from "./pages/login-page.component";
import {NoAuthGuard} from "./no-auth-guard.service";
import {NgModule} from "@angular/core";
import {Error404Component} from "../../shared/components/error/404/error404.component";

const routes: Routes = [
  {path: '', component: LoginPageComponent, canActivate: [NoAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginRoutingModule {
}
