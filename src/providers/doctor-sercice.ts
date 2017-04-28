import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DoctorService {
  public token: string;
  public id: number;

  constructor(public http: Http) {}

  getSpecialities() {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://172.16.29.62:3000/doctor-types", options)
        .map(response => response.json());
  }

  ajouter(doctor: {lastName:string, phone:string, address:string, type_id:number}) {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://172.16.29.62:3000/users/"+localStorage.getItem('id')+"/doctors", JSON.stringify(doctor), options)
        .map(response => response.json());
  }

  getDoctors() {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://172.16.29.62:3000/users/"+localStorage.getItem('id')+"/doctors", options)
        .map(response => response.json());
  }

  deleteDoctor(id:number) {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete("http://172.16.29.62:3000/users/"+localStorage.getItem('id')+"/doctors/"+id, options)
        .map(response => response.json());
  }
}
