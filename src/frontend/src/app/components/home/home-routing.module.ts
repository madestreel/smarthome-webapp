import {RouterModule, Routes} from "@angular/router";
import {RoutesConfig} from "../../configs/routes.config";
import {HomePageComponent} from "./home-page.component";
import {AuthGuard} from "../../core/services/auth-guard.service";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: RoutesConfig.routesName.home, component: HomePageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {
}
