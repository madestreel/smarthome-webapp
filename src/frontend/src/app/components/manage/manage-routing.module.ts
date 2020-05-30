import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../core/services/auth-guard.service";
import {Permission} from "../../core/models/permission.model";
import {NgModule} from "@angular/core";
import {Manage} from "./manage.component";
import {ManageRoom} from "./room/manage.component";
import {ManageDevice} from "./device/manage.component";

const routes: Routes = [
  {path: '', component: Manage, canActivate: [AuthGuard], data: {permission: Permission.ADMIN}},
  {path: 'room/:roomID', component: ManageRoom, canActivate: [AuthGuard], data: {permission: Permission.ADMIN}},
  {path: 'device/:deviceID', component: ManageDevice, canActivate: [AuthGuard], data: {permission: Permission.ADMIN}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManageRoutingModule {

}
