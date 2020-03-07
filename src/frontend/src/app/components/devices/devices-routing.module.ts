import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RoutesConfig} from "../../configs/routes.config";
import {Devices} from "./devices.component";
import {AuthGuard} from "../../core/services/auth-guard.service";

const routes: Routes = [
  {path: '', component: Devices, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DevicesRoutingModule {}
