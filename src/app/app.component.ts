import { Component } from '@angular/core';
import { IThfMenu } from '@totvs/thf-web/components/thf-menu/thf-menu.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menu: IThfMenu[];

  constructor(){
    this.menu = [
      { menuName: 'home', label: 'Home', link: '/' },
      { menuName: 'task', label: 'Task', link: 'task' },
      { menuName: 'appointment', label: 'Solicitar agendas', link: 'appointment' },
      { menuName: 'help', label: 'Ajuda', link: 'http://fluig.totvs.com/portal/p/10097/ecmnavigation?app_ecm_navigation_doc=5164848' },
      { menuName: 'logout', label: 'Sair', link: 'login' }
    ];
  }
}
