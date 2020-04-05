import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../core/services/auth-guard.service";
import {Rooms} from "./rooms.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: '', component: Rooms, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoomsRoutingModule{}
