import { NgModule } from "@angular/core";
import { RouterModule, PreloadAllModules } from "@angular/router";


const appRoutes = [
    {path: "", redirectTo: 'home', pathMatch: 'full'},
    {path: "home", loadChildren: './secure/secure.module#SecureModule'},
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes, 
            {
                useHash: true,
                preloadingStrategy: PreloadAllModules
            }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{
}