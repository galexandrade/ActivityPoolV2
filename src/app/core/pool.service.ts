import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiHttpService } from './api-http.service';
import { Agenda } from '../shared/agenda';
import { AgendaRequest } from '../shared/agenda-request';
import { Planning } from "app/shared/planning";

@Injectable()
export class PoolService {
  EVENTCOLOR = {
    EM: {
      "desc": "Empréstimo",
      "color": "#808080"
    },
    FE: {
      "desc": "Férias",
      "color": "#FF8C00"
    },
    FN: {
      "desc": "Finalizado",
      "color": "#CC00FF"
    },
    PL: {
      "desc": "Planejado",
      "color": "#FF5050"
    },
    PV: {
      "desc": "Previsto",
      "color": "#00CC00"
    },
    RP: {
      "desc": "Replanejar",
      "color": "#FFCC00"
    },
    FERIADO: {
      "desc": "Feriado",
      "color": "#000000"
    },
    HOJE: {
      "desc": "Hoje",
      "color": "#337ab7"
    }
  };

  selectedPlanning: Planning;
  selectedPlanningDay: Date;
  plannings: Planning[];
  initialDate: Date;
  finalDate: Date;

  private resourcePath: string;

  constructor(private http: ApiHttpService) {
    this.resourcePath = 'planning';
  }

  create(agenda: Agenda): Observable<any> {
    return this.http.post(this.resourcePath, agenda);
  }

  update(key: string, agenda: Agenda): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.put(url, agenda);
  }

  get(path?: string, params?: any): Observable<any> {
    let url: string = this.resourcePath + (path ? '/' + path : '');
    return this.http.get(url, params, true);
  }

  delete(key: string): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.delete(url);
  }

  request(request: AgendaRequest): Observable<any> {
    let url: string = this.resourcePath + '/request';
    return this.http.put(url, request);
  }
  
  searchByTicket(ticket: string): Observable<any> {
    let url: string = 'projects';
    return this.http.get(url, {issue: ticket}, true);
  }
}
