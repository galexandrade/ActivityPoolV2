import { NgModule } from "@angular/core";
import { RouterModule, PreloadAllModules, Routes } from "@angular/router";
import { ScheduleComponent } from "./schedule/schedule.component";
import { AppointmentComponent } from "./appointment/appointment.component";
import { TaskComponent } from "./task/task.component";
import { SecureComponent } from "app/secure/secure.component";
import { AuthGuard } from "app/core/auth-guard.service";

const appRoutes: Routes = [
    {
        path: "", 
        component: SecureComponent, 
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {path: "", redirectTo: "schedule"},
            {path: "schedule", component: ScheduleComponent, canLoad: [AuthGuard]},
            {path: "appointment", component: AppointmentComponent, canLoad: [AuthGuard]},
            {path: "task", component: TaskComponent, canLoad: [AuthGuard]}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(
            appRoutes
        )
    ],
    exports: [RouterModule]
})
export class SecureRoutingModule{
}