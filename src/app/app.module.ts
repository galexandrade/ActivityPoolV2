import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "app/app-routing.module";
import { ThfMenuModule } from '@totvs/thf-web/components/thf-menu';
import { ThfPageModule } from '@totvs/thf-web/components/thf-page';
import { ThfButtonModule } from '@totvs/thf-web/components/thf-button';
import { ThfFieldModule } from '@totvs/thf-web/components/thf-field';
import { ThfInfoModule } from '@totvs/thf-web/components/thf-info';
import { ThfDropdownModule } from '@totvs/thf-web/components/thf-dropdown';
//import { CalendarModule } from 'angular-calendar';
import { LoginComponent } from './login/login.component';

import {CalendarModule} from "ap-angular2-fullcalendar";
import { CoreModule } from "app/core/core.module";
import { ToasterModule } from "angular2-toaster/angular2-toaster";
import { SlimLoadingBarModule } from "ng2-slim-loading-bar";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToasterModule,
    SlimLoadingBarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
