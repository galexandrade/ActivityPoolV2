import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiHttpService } from './api-http.service';

@Injectable()
export class ParameterService {

  private resourcePath: string;
  email: string = "";

  constructor(private http: ApiHttpService) {
    this.resourcePath = 'parameters';
  }

  get(name: string): Observable<any> {
    return this.http.get(this.resourcePath, {"name": name});
  }
}
