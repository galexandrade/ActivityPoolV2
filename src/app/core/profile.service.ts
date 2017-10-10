import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiHttpService } from './api-http.service';
import { User } from '../shared/user';

@Injectable()
export class ProfileService {
  private resourcePath: string;

  constructor(private http: ApiHttpService) {
    this.resourcePath = "profile";
  }

  updateAccount(key: string, user: User): Observable<any> {
    return this.http.put(this.resourcePath, user);
  }

  getProfile(key:string): Observable<any> {
    return this.http.get(this.resourcePath);
  }
}
