import { NgModule } from '@angular/core';

import { SharedModule} from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent} from './login.component';
import { ThfButtonModule } from "@totvs/thf-web/components/thf-button";
import { ThfFieldModule } from "@totvs/thf-web/components/thf-field";
import { ThfInfoModule } from "@totvs/thf-web/components/thf-info";

@NgModule({
  imports: [
    SharedModule, 
    LoginRoutingModule,
    ThfButtonModule,
    ThfFieldModule,
    ThfInfoModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
