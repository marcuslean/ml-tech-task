import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { TaskListComponent } from "./task-list/task-list.component";

const appRoutes: Routes = [
    { path: 'task-list', component: TaskListComponent, canActivate: [AuthGuard] },
    { path: 'auth', component: AuthComponent },
    { path: '**', redirectTo: '/auth' },
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}