import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpInterceptor } from './services/http-interceptor.service';
import { Broadcaster } from './services/broadcaster.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  model: any = {};

  constructor(private http: HttpInterceptor, private broadcaster: Broadcaster) {

    this.broadcaster.on<string>('tryton:Unauthorized')
      .subscribe(message => {
         console.log("Unauthorized error", message);
      });

    this.broadcaster.on<string>('tryton:UserError')
      .subscribe(message => {
         console.log("User error", message);
      });
  }

  login() {
    this.getUser().subscribe(data => console.log(data));
  }

  getUser() {
    return this.http.post(`http://localhost:8000/`, { method: "common.db.login", params: [this.model.username, this.model.password]})
    .map((res:Response) => res.json());
  }
}
