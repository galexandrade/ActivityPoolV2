import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiHttpService } from './api-http.service';
import { Agenda } from '../shared/agenda';
import { AgendaRequest } from '../shared/agenda-request';
import { Planning } from "app/shared/planning";

@Injectable()
export class PoolService {
  EVENTCOLOR = {
    EM: "#808080",
    FE: "#FF8C00",
    FN: "#CC00FF",
    PL: "#FF5050",
    PV: "#00CC00",
    RP: "#FFCC00",
    FERIADO: "rgba(174, 234, 255, 0.55)",
    HOJE: "#337ab7"
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
