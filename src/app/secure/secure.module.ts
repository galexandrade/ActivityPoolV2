import { NgModule, Compiler } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SecureRoutingModule } from "app/secure/secure-routing.module";
import { TaskComponent } from "app/secure/task/task.component";
import { AppointmentComponent } from "app/secure/appointment/appointment.component";
import { ScheduleComponent } from "app/secure/schedule/schedule.component";

import { ThfMenuModule } from "@totvs/thf-web/components/thf-menu";
import { CalendarModule } from "ap-angular2-fullcalendar";
import { FormsModule } from "@angular/forms";
import { TooltipModule } from "ng2-tooltip";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ThfTableModule } from "@totvs/thf-web/components/thf-table";
import { ThfDropdownModule } from "@totvs/thf-web/components/thf-dropdown";
import { ThfButtonModule } from "@totvs/thf-web/components/thf-button";
import { ThfFieldModule } from "@totvs/thf-web/components/thf-field";
import { ThfInfoModule } from "@totvs/thf-web/components/thf-info";
import { ThfTabsModule } from '@totvs/thf-web/components/thf-tabs';
import { SecureComponent } from './secure.component';
import { SharedModule } from "app/shared/shared.module";
import { ThfGridModule } from '@totvs/thf-web/components/thf-grid';
import { InternalComponent } from './internal/internal.component';

@NgModule({
  imports: [
    CommonModule,
    SecureRoutingModule,
    ThfMenuModule,
    CalendarModule,
    FormsModule,
    ThfDropdownModule,
    ThfTableModule,
    ThfButtonModule,
    ThfFieldModule,
    ThfInfoModule,
    TooltipModule,
    ThfTabsModule,
    ThfGridModule,
    SharedModule
  ],
  declarations: [
    ScheduleComponent,
    AppointmentComponent,
    TaskComponent,
    SecureComponent,
    InternalComponent
  ],
  providers: [DatePipe]
})
export class SecureModule { }
