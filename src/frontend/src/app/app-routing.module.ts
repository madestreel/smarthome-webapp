import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoutesConfig} from "./configs/routes.config";
import {Error404Component} from "./shared/components/error/404/error404.component";


const routes: Routes = [
  {path: RoutesConfig.routesName.home, loadChildren: './components/home/home-routing.module#HomeRoutingModule'},
  {path: RoutesConfig.routesName.login, loadChildren: './components/login/login-routing.module#LoginRoutingModule'},
  {path: "**", component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
