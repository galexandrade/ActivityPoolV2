import { Component, OnInit } from '@angular/core';
import { ParameterService } from "app/core/parameter.service";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  menu: any[];
  
  constructor(private parameterService: ParameterService) {
    this.menu = [
      { menuName: 'home', label: 'Home', link: '.' },
      { menuName: 'appointment', label: 'Solicitar agendas', link: './appointment' },
      { menuName: 'internal', label: 'Apontamentos internos', link: './internal' },
      { label: "Links úteis", subItems: [
        {label: "Portal de Serviços", link: "http://fluig.totvs.com/portal/p/10097/portal-servicos"},
        {label: "Pool de Recursos", link: "http://totvsjoi-hcm08:8080/portal/hcm/pool-recursos"},
        {label: "Task Manager", link: "http://totvsjoi-hcm08.jv01.local:9090/tasks"}
      ] },
      { menuName: 'help', label: 'Ajuda', link: 'http://fluig.totvs.com/portal/p/10097/ecmnavigation?app_ecm_navigation_doc=5164848' },
      { menuName: 'logout', label: 'Sair', link: "/login" }
    ];

    this.parameterService.get("AGENDA_REQUEST_MAIL_TO").subscribe(res => {
      this.parameterService.email = res.data;
    });
  }  

  ngOnInit() {
  }

  logOut(){
    console.log("logOut");
  }
}
