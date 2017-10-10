import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ToasterService } from 'angular2-toaster';

import { User } from '../shared/user';

@Injectable()
export class PublicAccountService {
  private url: string;

  constructor(private http: Http,
              private toaster: ToasterService) {
    this.url = environment.publicApiUrl + "/account";
  }

  createAccount(user: User): Observable<string> {
    let url: string = this.url + "/create";

    return this.http.post(url, user)
      .map(res => res.json().data)
      .catch(
        (error:any) => Observable.throw(this.decodeError(error.json()))
      ).publishLast().refCount();
  }

  authenticate(username:string, password:string): Observable<string> {
    let url: string = this.url + "/authenticate";
    let user: User = new User();
    user.email = username;
    user.password = password;

    return this.http.post(url, user)
      .map(res => res.json().data)
      .catch(
        (error:any) => Observable.throw(this.decodeError(error.json()))
      ).publishLast().refCount();
  }

  decodeError(data: any): any {
    if(data.code && data.status && data.message) {
      this.toaster.pop({
          type: 'error',
          body: data.message
      });
      return data;
    } else {
      let message: string = data.error || "Ops! Tem alguma coisa errada.";
      this.toaster.pop({
          type: 'error',
          body: message
      });
      return message;
    }
  }
}
