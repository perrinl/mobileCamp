import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppointmentService {
  public token: string;
  public id: number;

  constructor(public http: Http) {}


  add(appointment: {name:string, date:Date, notification_id:number, doctor_id:number}) {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://172.16.29.62:3000/users/"+localStorage.getItem('id')+"/appointments", JSON.stringify(appointment), options)
        .map(response => response.json());
  }

  getAppointments() {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://172.16.29.62:3000/users/"+localStorage.getItem('id')+"/appointments", options)
        .map(response => response.json());
  }

  delete(id:number) {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete("http://172.16.29.62:3000/users/"+localStorage.getItem('id')+"/appointments/"+id, options)
        .map(response => response.json());
  }
}
