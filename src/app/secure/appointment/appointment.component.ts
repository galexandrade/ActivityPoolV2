import { Component, OnInit, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { Router } from "@angular/router";
import { PoolService } from "app/core/pool.service";
import { Planning } from "app/shared/planning";
import * as moment from 'moment';
import { ToasterService } from "angular2-toaster/angular2-toaster";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { ParameterService } from "app/core/parameter.service";
import { SecureModule } from "app/secure/secure.module";
import { TaskModalComponent } from "app/secure/appointment/task-modal/task-modal.component";
import { AgendaRequest } from "app/shared/agenda-request";
import { AgendaRequestItem } from "app/shared/agenda-request-item";
import { Task } from "app/shared/task";
import { AgendaService } from "app/core/agenda.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  seachTicketMode = false;
  showFilter = false;

  dateIni: string;
  dateFin: string;
  dateIniMonth: string;
  dateFinMonth: string; 

  columns = [
    { column: 'selected', label: '', width: 45, checkbox: true },
    { column: 'data', label: 'Data', required: true, editable: true, width: 150, format: "{0:dd/MM/yyyy}" },
    { column: 'horaIni', label: 'Hr Início', required: true, editable: true, width: 125, editor: 'numeric'  },
    { column: 'horaFin', label: 'Hr Final', required: true, editable: true, width: 125  },
    { column: 'horaInterv', label: 'Hr Interv', required: true, editable: true, width: 125 }
  ];

  actions: Array<any> = [
    { function: 'onChangeData', label: 'Alterar dados' }
  ];

  plannings: any[];

  ticketSearch: string = "";
  email: string = "";
  emailcc: string = "";

  constructor(private route: Router,
              private poolService: PoolService,
              private parameterService: ParameterService,
              private toaster: ToasterService,
              private slimLoadingBarService: SlimLoadingBarService,
              private agendaService: AgendaService) { 
    if(!this.poolService.plannings)
      this.goBack();
  }

  ngOnInit() {
    this.dateIni = this.poolService.initialDate.toISOString();
    this.dateIniMonth = new Date(moment(this.poolService.initialDate).format("YYYY-MM-DD") + "T00:00:00.0+0100").toISOString();
    this.dateFin = this.poolService.finalDate.toISOString();
    this.dateFinMonth = this.poolService.finalDate.toISOString();

    if(this.poolService.finalDate.getFullYear() === new Date().getFullYear() &&
       this.poolService.finalDate.getMonth() === new Date().getMonth()){
      let dtNow = new Date();
      this.dateFin = dtNow.toISOString();
      
      dtNow.setDate(new Date().getDate() - 10);
      if(dtNow.getMonth() === this.poolService.initialDate.getMonth())
        this.dateIni = dtNow.toISOString();
    }

    this.loadPlannings();

    this.email = this.parameterService.email;
  }

  loadPlannings(){
    this.plannings = [];
    this.poolService.plannings.forEach(planning => {
      let data = [];
      
      for(let dateIni = new Date(planning.inicio + "T10:00:00.0+0100"); dateIni <= new Date(planning.termino + "T10:00:00.0+0100"); dateIni.setDate(dateIni.getDate() + 1)){
        if(dateIni > new Date(moment(this.dateFin).format("YYYY-MM-DD") + "T10:00:00.0+0100"))
          break;

        if(dateIni < new Date(moment(this.dateIni).format("YYYY-MM-DD") + "T10:00:00.0+0100"))
          continue;

        data.push({ 
          selected: true,
          data: moment(dateIni).format("DD/MM/YYYY"), 
          horaIni: '08:00', 
          horaFin: '18:00', 
          horaInterv: '01:30' 
        });
      }

      let alreadyExists = false;
      this.plannings.forEach(planningsSearch => {
        if(planning.clientCode === planningsSearch.clientCode &&
           planning.cfpProject === planningsSearch.cfpProject &&
           planning.pmsProject === planningsSearch.pmsProject){
          planningsSearch.items = [...planningsSearch.items, ...data].sort(this.sortDate);
          alreadyExists = true;
        }           
      });

      if(data.length > 0 && !alreadyExists){
        this.plannings.push({
          ...planning,
          items: data,
          columns: this.columns.slice()
        });
      }
    });
  }

  sortDate(a: any, b: any){
    let a_date = a.data.split("/");
    a_date = new Date(a_date[2], a_date[1], a_date[0]);

    let b_date = b.data.split("/");
    b_date = new Date(b_date[2], b_date[1], b_date[0]);

    return a_date < b_date ? -1 : 1;
  }

  search(){
    if(!this.seachTicketMode)
      this.loadPlannings();
    else
      this.searchByTicket();
  }

  searchByTicket(){
    this.slimLoadingBarService.start();
    this.slimLoadingBarService.progress = 30;
    this.poolService.searchByTicket(this.ticketSearch).subscribe(tickets => {
      this.slimLoadingBarService.complete();
      if(tickets.length === 0){
        this.toaster.pop({
            type: 'error',
            body: "Nenhum ticket encontrado no pool com o código informado!"
        });
        return;
      }
        

      this.plannings = [];
      tickets.forEach(ticket => {
        let ticketPlanning = new Planning();
        ticketPlanning.cfpProject = ticket.cfpProject;
        ticketPlanning.pmsProject = ticket.pmsProject;
        ticketPlanning.chamado = this.ticketSearch;
        ticketPlanning.clientCode = ticket.clientCode;
        ticketPlanning.clientName = ticket.clientName;
        ticketPlanning.inicio = "2017-08-10";
        ticketPlanning.termino = "2017-08-20";
  
        this.plannings.push({
          ...ticketPlanning,
          items: [{ 
            data: moment(new Date(ticketPlanning.inicio)).format("DD/MM/YYYY"), 
            horaIni: '08:00', 
            horaFin: '18:00', 
            horaInterv: '01:30' 
          }]
        });
      });
    });
  }

  goBack(): void {
    this.route.navigate(['/home']);
  }

  switchSearchMode(){
    this.seachTicketMode = !this.seachTicketMode;
  }

  switchFilter(){
    this.showFilter = !this.showFilter;
  }

  onSendRequest(){
    
    let request: AgendaRequest;
    let itensRequest: AgendaRequestItem[] = []; 

    this.plannings.forEach(planning => {
      let tasks: Task[] = [];

      
      planning.items.forEach(item => {
        tasks.push(
          new Task(
            item.data,
            item.horaIni,
            item.horaFin,
            item.horaInterv,
            planning.ticket,
            planning.cfpProject,
            planning.pmsProject,
            planning.clientCode,
            planning.clientName,
            ""
          ))
      });

      itensRequest.push(
        new AgendaRequestItem(
          planning.ticket,
          planning.clientCode,
          planning.clientName,
          planning.cfpProject,
          planning.pmsProject,
          tasks
        )
      );
    });

    request = new AgendaRequest(
      this.email,
      this.emailcc,
      itensRequest
    );
    
    this.agendaService.request(request).subscribe((res) => {
      console.log(res);
    });
  }

}
