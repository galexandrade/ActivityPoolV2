import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ToasterService } from 'angular2-toaster';
import { Http } from "@angular/http";

@Injectable()
export class ApiHttpService {

  private url: string;
  private urlPool: string;

  constructor(private http: AuthHttp,
              private httpDefault: Http,
              private toaster: ToasterService) {
    this.url = environment.apiUrl;
    this.urlPool = environment.apiPool;
  }

  post(resourcePath: string, data: any): Observable<any> {
    let url : string = this.url + '/' + resourcePath;
    return this.http.post(url, data)
      .map(res => this.decodeSuccess(res))
      .catch((error: any) => Observable.throw(this.decodeError(error.json())))
      .publishLast()
      .refCount();
  }

  put(resourcePath: string, data: any): Observable<any> {
    let url : string = this.url + '/' + resourcePath;
    return this.http.put(url, data)
      .map(res => this.decodeSuccess(res))
      .catch((error: any) => Observable.throw(this.decodeError(error.json())))
      .publishLast()
      .refCount();
  }

  get(resourcePath: string, params?: any, fromPool?: boolean): Observable<any> {
    let url : string = (!fromPool ? this.url : this.urlPool) + '/' + resourcePath;

    if(params) {
      url += '?';
      let arr: string[] = [];
      for(let attr in params) {
        if(params[attr] != null)
          arr.push(attr + '=' + params[attr]);
      }
      url += arr.join('&');
    }

    let request: Observable<any>;
    if(!fromPool)
      request = this.http.get(url);
    else
      request = this.httpDefault.get(url);

    return request
      .map(res => this.decodeSuccess(res))
      .catch((error: any) => Observable.throw(this.decodeError(error.json())))
      .publishLast()
      .refCount();
  }

  delete(resourcePath: string): Observable<any> {
    let url : string = this.url + '/' + resourcePath;
    return this.http.delete(url)
      .map(res => this.decodeSuccess(res))
      .catch((error: any) => Observable.throw(this.decodeError(error.json())))
      .publishLast()
      .refCount();
  }

  decodeSuccess(data: any): any {
    data = data.json();
    if(data.status && data.message) {
      this.toaster.pop({
          type: 'success',
          body: data.message
      });
    }
    return data;
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
