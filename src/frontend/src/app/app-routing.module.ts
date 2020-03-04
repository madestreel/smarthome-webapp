import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoutesConfig} from "./configs/routes.config";
import {HomePageComponent} from "./home/home-page.component";
import {LoginPageComponent} from "./login/pages/login-page.component";
import {Error404Component} from "./error/404/error404.component";


const routes: Routes = [
  {path: RoutesConfig.routesName.login, component: HomePageComponent},
  {path: RoutesConfig.routesName.home, component: LoginPageComponent},
  {path: "**", component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
