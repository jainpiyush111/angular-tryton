import { NgModule } from '@angular/core';
import { HttpInterceptor } from './http-interceptor.service';
import { Broadcaster } from './broadcaster.service';

@NgModule({
  providers: [
    HttpInterceptor,
    Broadcaster
  ]
})

export class ServiceModule { }