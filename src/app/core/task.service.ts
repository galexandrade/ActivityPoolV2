import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiHttpService } from './api-http.service';
import { Task } from '../shared/task';

@Injectable()
export class TaskService {

  private resourcePath: string;

  constructor(private http: ApiHttpService) {
    this.resourcePath = 'tasks';
  }

  get(path?: string, params?: any): Observable<any> {
    let url: string = this.resourcePath + (path ? '/' + path : '');
    return this.http.get(url, params);
  }
}
