import { Component, OnInit, ViewChild } from '@angular/core';
import { ThfMenuItem } from '@totvs/thf-core/components/thf-menu-base'; 
import { AgendaService } from "app/core/agenda.service";
import { Agenda } from "app/shared/agenda";
import { PoolService } from "app/core/pool.service";
import { CalendarComponent } from "ap-angular2-fullcalendar";
//import * as moment from 'moment';
import { Planning } from "app/shared/planning";
import { Router, ActivatedRoute } from "@angular/router";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent{
  plannings: Planning[];
  @ViewChild('calendar') calendar: CalendarComponent;
  legend = [];
  
  calendarOptions:Object = {
    fixedWeekCount : false,
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    viewRender: this.viewRender.bind(this),
    eventClick: this.eventClick.bind(this),
    locale: 'pt-br',
    events: []
  };

  constructor(private poolService: PoolService,
              private route: ActivatedRoute,
              private router: Router,
              private slimLoadingBarService: SlimLoadingBarService,
              private datePipe: DatePipe) { 
    
  }

  ngOnInit() {
    
  }

  viewRender(view: any, element: any){
    let finalDate: Date = new Date(view.currentRange.end);
    
    let initialDate: Date = new Date(this.datePipe.transform(finalDate,"y-MM") + "-01T10:00:00.0+0100");

    this.poolService.initialDate = initialDate;
    this.poolService.finalDate = new Date(this.datePipe.transform(finalDate, "y-MM-dd") + "T10:00:00.0+0100");

    this.search(initialDate, finalDate);
  }

  eventClick(event: any, jsEvent: any, view: any){
    if(event.holiday)
      return;

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
      initialDate: this.datePipe.transform(initialDate, "y-MM-dd"),
      finalDate: this.datePipe.transform(finalDate, "y-MM-dd"),
      ociosity: false,
      resources: "313075",
      detail: true
    };

    this.plannings = new Array<Planning>();

    this.calendarOptions['events'] = []; 

    this.poolService.get(undefined, params).subscribe(
      res => {
        let events = [];
        this.legend = [];
        this.plannings = res.plannings;

        this.poolService.plannings = this.plannings;

        this.plannings.forEach(planning => {
          let title = planning.resumo;
          let textSplit = planning.resumo.split(" - Obs: ");
          if(textSplit.length > 1)
            planning.resumo = textSplit[1];

          events.push({
            title: title,
            start: planning.inicio,
            end: planning.termino + "T10:00:00.0+0100",
            backgroundColor: this.poolService.EVENTCOLOR[planning.alocacao].color,
            planning: planning
          });

          if(this.legend.filter(ele => ele.cod === planning.alocacao).length === 0){
            this.legend.push({
              cod: planning.alocacao,
              color: this.poolService.EVENTCOLOR[planning.alocacao].color,
              desc: this.poolService.EVENTCOLOR[planning.alocacao].desc
            });
          }
        });

        res.holidays.forEach(holiday => {
          events.push({
              start: holiday.date + 'T10:00:00',
              end: holiday.date + 'T10:00:00',
              title: holiday.name,
              holiday: true
          });

          if(this.legend.filter(ele => ele.cod === "FERIADO").length === 0){
            this.legend.push({
              cod: "FERIADO",
              color: this.poolService.EVENTCOLOR["FERIADO"].color,
              desc: this.poolService.EVENTCOLOR["FERIADO"].desc
            });
          }
        });

        this.calendar.fullCalendar('removeEvents');
        this.calendar.fullCalendar('addEventSource', events);
      }
    );
  }
}
