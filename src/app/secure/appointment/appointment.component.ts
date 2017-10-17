import { Component, OnInit, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { Router } from "@angular/router";
import { PoolService } from "app/core/pool.service";
import { Planning } from "app/shared/planning";
import { ToasterService } from "angular2-toaster/angular2-toaster";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { ParameterService } from "app/core/parameter.service";
import { SecureModule } from "app/secure/secure.module";
import { AgendaRequest } from "app/shared/agenda-request";
import { AgendaRequestItem } from "app/shared/agenda-request-item";
import { Task } from "app/shared/task";
import { AgendaService } from "app/core/agenda.service";
import { DatePipe } from "@angular/common";
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  animations: [
    trigger('enterAnimation', [
      transition('void => *', [
        style({
					opacity: 0
					//transform: 'translateX(-100px)'
				}),
        animate(500)
      ])
    ])
  ]
})
export class AppointmentComponent implements OnInit {
  seachTicketMode = false;
  showFilter = false;

  dateIni: string;
  dateFin: string;
  dateIniMonth: string;
  dateFinMonth: string; 

  sending = false;

  columns = [
    { column: 'selected', label: '', width: 45, checkbox: true },
    { column: 'data', label: 'Data', required: true, editable: true, width: 150, format: "dd/MM/yyyy" },
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
              private agendaService: AgendaService,
              private datePipe: DatePipe) { 
    if(!this.poolService.plannings)
      this.goBack();
  }

  ngOnInit() {
    this.dateIni = this.poolService.initialDate.toISOString();
    this.dateIniMonth = new Date(this.datePipe.transform(this.poolService.initialDate, "y-MM-dd") + "T00:00:00.0+0100").toISOString();
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
    this.slimLoadingBarService.start();
    this.poolService.plannings.forEach(planning => {
      let data = [];
      
      for(let dateIni = new Date(planning.inicio + "T10:00:00.0+0100"); dateIni <= new Date(planning.termino + "T10:00:00.0+0100"); dateIni.setDate(dateIni.getDate() + 1)){
        //if(dateIni > new Date(moment(this.dateFin).format("YYYY-MM-DD") + "T10:00:00.0+0100"))
        if(dateIni > new Date(this.datePipe.transform(this.dateFin, "y-MM-dd") + "T10:00:00.0+0100"))
          break;

        //if(dateIni < new Date(moment(this.dateIni).format("YYYY-MM-DD") + "T10:00:00.0+0100"))
        if(dateIni < new Date(this.datePipe.transform(this.dateIni, "y-MM-dd") + "T10:00:00.0+0100"))
          continue;

        data.push({ 
          selected: true,
          data: this.datePipe.transform(dateIni, "y-MM-dd"), 
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
    this.slimLoadingBarService.complete();
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
    if(this.ticketSearch === ""){
      this.toaster.pop({
        type: 'error',
        body: "Informe um tícket!"
      });
      return;
    }

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
        
      console.log(tickets);

      this.plannings = [];
      tickets.forEach(ticket => {
        let ticketPlanning = new Planning();
        ticketPlanning.cfpProject = ticket.cfpProject;
        ticketPlanning.pmsProject = ticket.pmsProject;
        ticketPlanning.chamado = this.ticketSearch;
        ticketPlanning.clientCode = ticket.cientCode;
        ticketPlanning.clientName = ticket.cientName;
        ticketPlanning.inicio = this.datePipe.transform(new Date(), "y-MM-dd");
        ticketPlanning.termino = this.datePipe.transform(new Date(), "y-MM-dd");

        console.log(this.datePipe.transform(new Date(ticketPlanning.inicio), "dd/MM/y"));
  
        this.plannings.push({
          ...ticketPlanning,
          items: [{ 
            data: ticketPlanning.inicio, //this.datePipe.transform(new Date(ticketPlanning.inicio), "dd/MM/y"), 
            selected: true,
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

    if(this.email === ""){  
      this.toaster.pop({
        type: 'error',
        body: "Informe o email!"
      });    
      return;
    }

    this.sending = true;

    this.plannings.forEach(planning => {
      let tasks: Task[] = [];

      
      planning.items.forEach(item => {
        console.log(item);
        let dt = item.data.split("/");
        console.log(dt);
        if(item.selected){
          tasks.push(
            new Task(
              //dt[2] + "-" + dt[1] + "-" + dt[0],
              item.data,
              item.horaIni + ":00:00", //.substring(0,5),
              item.horaFin + ":00:00", //.substring(0,5),
              item.horaInterv + ":00:00", //.substring(0,5),
              planning.chamado,
              planning.cfpProject,
              planning.pmsProject,
              planning.clientCode,
              planning.clientName,
              ""
          ));
        }
      });

      if(tasks.length > 0){
        itensRequest.push(
          new AgendaRequestItem(
            planning.chamado,
            planning.clientCode,
            planning.clientName,
            planning.cfpProject,
            planning.pmsProject,
            tasks
          )
        );
      }
      
    });

    if(itensRequest.length > 0){
      request = new AgendaRequest(
        this.email,
        this.emailcc,
        itensRequest
      );
      this.agendaService.request(request).subscribe((res) => {
        console.log(res);
        this.sending = false;
      },
      (err) => this.sending = true);
    }
    else{
      this.sending = false;
      this.toaster.pop({
        type: 'error',
        body: "Nenhuma agenda selecionada!"
      });    
      return;
    }    
  }

  addItem(idxPlanning){
    console.log(idxPlanning);
    this.plannings[idxPlanning].items.push({
      data: this.datePipe.transform(new Date(), "y-MM-dd"),
      selected: true,
      horaIni: '08:00', 
      horaFin: '18:00', 
      horaInterv: '01:30' 
    });
  }

}
