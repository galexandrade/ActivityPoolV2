import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PoolService } from "app/core/pool.service";
import { Planning } from "app/shared/planning";
import { AgendaRequest } from "app/shared/agenda-request";
import { AgendaRequestItem } from "app/shared/agenda-request-item";
import { Task } from "app/shared/task";
import { AgendaService } from "app/core/agenda.service";
import { ParameterService } from "app/core/parameter.service";
import { DatePipe } from "@angular/common";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  date = "";
  dateStart = new Date('June 05, 2013 01:15:00').toISOString();
  dateEnd = new Date('August 15, 9999 01:15:00').toISOString();

  timeIni: string = "08:00";
  timeFinal: string = "17:30";
  timeIntervalo: string = "01:30";

  planning: Planning;
  email: string = "";

  sending = false;

  constructor(private route: Router,
              private agendaService: AgendaService,
              private parameterService: ParameterService,
              private poolService: PoolService,
              private datePipe: DatePipe) { 
    if(!this.poolService.selectedPlanning)
      this.goBack();
  }

  ngOnInit() {
    this.planning = this.poolService.selectedPlanning;
    console.log(this.poolService.selectedPlanningDay.toISOString());
    this.date = this.poolService.selectedPlanningDay.toISOString();
    this.email = this.parameterService.email;
  }

  goBack(): void {
    this.route.navigate(['/home']);
  }

  onSendRequest(form: any){
    console.log(form);

    this.sending = true;
    
    let request: AgendaRequest = new AgendaRequest(
      form.email,
      form.emailcc,
      [
        new AgendaRequestItem(
          form.ticket,
          this.planning.clientCode,
          this.planning.clientName,
          form.project,
          form.front,
          [
            new Task(
              this.datePipe.transform(new Date(form.date), "y-MM-dd"),
              form.timeStart + ":00:00",
              form.timeEnd + ":00:00",
              form.timeInterval + ":00:00",
              form.ticket,
              form.project,
              form.front,
              this.planning.clientCode,
              this.planning.clientName,
              form.activity
            )
          ]
        )
      ]
    );
    
    this.agendaService.request(request).subscribe((res) => {
      console.log(res);
      this.sending = false;
    });
  }

  fillForm(form: any){
    console.log(form);
    let data_planing = this.datePipe.transform(new Date(form.date), "y-MM-dd");    
    let activity = form.activity.replace("\n", " ");

    console.log(activity);

    var commands = `loadApointment('${this.planning.clientCode}', '${this.planning.clientName}', '${form.project}', '${form.front}', '2010067-2', '999', '${activity}', '${data_planing}');`;
    console.log(commands);

    
                           
    chrome.tabs.executeScript(null,
        {
            code: `var scr = document.createElement('script');
                  scr.innerHTML = "${commands}";
                  document.body.appendChild(scr);`,
        }
    );
    window.close();
  }
  
}
