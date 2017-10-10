import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiHttpService } from './api-http.service';
import { Agenda } from '../shared/agenda';
import { AgendaRequest } from '../shared/agenda-request';

@Injectable()
export class AgendaService {

  private resourcePath: string;

  constructor(private http: ApiHttpService) {
    this.resourcePath = 'agendas';
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
    return this.http.get(url, params);
  }

  delete(key: string): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.delete(url);
  }

  request(request: AgendaRequest): Observable<any> {
    console.log(request);
    let url: string = this.resourcePath + '/request';
    return this.http.post(url, request);
  }
}
