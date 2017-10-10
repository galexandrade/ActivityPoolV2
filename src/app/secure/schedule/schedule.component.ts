import { Component, OnInit, ViewChild } from '@angular/core';
import { IThfMenu } from "@totvs/thf-web/components/thf-menu/thf-menu.interface";
import { AgendaService } from "app/core/agenda.service";
import { Agenda } from "app/shared/agenda";
import { PoolService } from "app/core/pool.service";
import { CalendarComponent } from "ap-angular2-fullcalendar";
import * as moment from 'moment';
import { Planning } from "app/shared/planning";
import { Router, ActivatedRoute } from "@angular/router";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent{
  plannings: Planning[];
  @ViewChild('calendar') calendar: CalendarComponent;
  
  calendarOptions:Object = {
    fixedWeekCount : false,
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    viewRender: this.viewRender.bind(this),
    eventClick: this.eventClick.bind(this),
    events: []
  };

  constructor(private poolService: PoolService,
              private route: ActivatedRoute,
              private router: Router,
              private slimLoadingBarService: SlimLoadingBarService) { 
    
  }

  ngOnInit() {
    
  }

  viewRender(view: any, element: any){
    let finalDate: Date = moment(view.currentRange.end, "MM-DD-YYYY").toDate();
    let initialDate: Date = new Date(moment(finalDate).format("YYYY-MM") + "-01T10:00:00.0+0100");

    this.poolService.initialDate = initialDate;
    this.poolService.finalDate = new Date(moment(finalDate).format("YYYY-MM-DD") + "T10:00:00.0+0100");

    this.search(initialDate, finalDate);
  }

  eventClick(event: any, jsEvent: any, view: any){
    let days = jsEvent.target.closest('table').querySelectorAll('.fc-day-top');
    let daySelected: any;
    for (var i = 0; i < days.length; i++){
      if(days[i].offsetLeft + 15 > jsEvent.pageX){
        daySelected = i === 0 ? days[i] : days[i - 1];
        break;
      }

      if (i == days.length - 1){
        daySelected = days[i];
      }
    }

    this.poolService.selectedPlanningDay = new Date(daySelected.getAttribute("data-date") + "T10:00:00.0+0100");
    this.poolService.selectedPlanning = event.planning;
    this.router.navigate(['../task'], {relativeTo: this.route});
  }

  onCalendarInit(event: any) {
    console.log('Calendar initialized');
  }

  search(initialDate: Date, finalDate: Date): void {
    const params = {
      allocationTypes: "EM,FE,FN,PL,PV,RP",
      initialDate: moment(initialDate).format("YYYY-MM-DD"),
      finalDate: moment(finalDate).format("YYYY-MM-DD"),
      ociosity: false,
      resources: "313075",
      detail: true
    };

    this.plannings = new Array<Planning>();

    this.calendarOptions['events'] = [];   

    this.slimLoadingBarService.start();

    this.poolService.get(undefined, params).subscribe(
      res => {
        let events = [];
        this.plannings = res.plannings;

        this.poolService.plannings = this.plannings;

        this.plannings.forEach(planning => {
          let title = planning.resumo;
          let textSplit = planning.resumo.split(" - Obs: ");
          if(textSplit.length > 1)
            planning.resumo = textSplit[1];

          //REMOVER
          //planning.hasAgenda = "Sim";

          events.push({
            title: title,
            start: planning.inicio,
            end: planning.termino,
            backgroundColor: this.poolService.EVENTCOLOR[planning.alocacao],
            planning: planning
          });
        });

        this.calendar.fullCalendar('removeEvents');
        this.calendar.fullCalendar('addEventSource', events);
        this.slimLoadingBarService.complete();
      }
    );
  }
}
