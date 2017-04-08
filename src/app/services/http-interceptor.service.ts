import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { Broadcaster } from './broadcaster.service';

@Injectable()
export class HttpInterceptor {

  constructor(private http: Http, private broadcaster: Broadcaster) {}

  get(url) {
    return this.http.get(url).map((res:Response) => {
      return this.responseInterceptor(res);
    });
  }

  post(url, data) {
    return this.http.post(url, data).map((res:Response) => {
      return this.responseInterceptor(res);
    });
  }

  responseInterceptor(response) {
    var res = response.json();
    if (res.error) {
     var error = res.error;
     if (error[0].startsWith('401') || error[0].startsWith('403')) {
       this.broadcaster.broadcast("tryton:Unauthorized");
     } else if (error[0] == 'UserError') {
       this.broadcaster.broadcast("tryton:UserError", error);
     } else if (error[0] == 'UserWarning') {
       this.broadcaster.broadcast("tryton:UserWarning", error);
     } else if (error[0] == 'ConcurrencyException') {
       this.broadcaster.broadcast("tryton:ConcurrencyException", error);
     } else {
       this.broadcaster.broadcast("tryton:Exception", error);
     }
    }
    return response; 
  }
}