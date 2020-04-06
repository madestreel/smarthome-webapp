import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoutesConfig} from "./configs/routes.config";
import {Error404Component} from "./shared/components/error/404/error404.component";
import {About} from "./components/about/about.component";
import {AuthGuard} from "./core/services/auth-guard.service";


const routes: Routes = [
  {path: RoutesConfig.routesName.home, loadChildren: './components/home/home-routing.module#HomeRoutingModule'},
  {path: RoutesConfig.routesName.login, loadChildren: './components/login/login-routing.module#LoginRoutingModule'},
  {
    path: RoutesConfig.routesName.devices,
    loadChildren: './components/devices/devices-routing.module#DevicesRoutingModule'
  },
  {
    path: RoutesConfig.routesName.rooms,
    loadChildren: './components/rooms/rooms-routing.module#RoomsRoutingModule'
  },
  {
    path: RoutesConfig.routesName.manage,
    loadChildren: './components/manage/manage-routing.module#ManageRoutingModule'
  },
  {path: RoutesConfig.routesName.about, component: About, canActivate: [AuthGuard]},
  {path: "**", component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
