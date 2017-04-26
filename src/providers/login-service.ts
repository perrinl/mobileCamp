import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {

  private tab: {email:string, password:string}[];

  constructor(private http:Http) {
    this.tab = [
      {email:"banane", password:"123"},
      {email:"banane2", password:"123"},
      ];
  }

  isRegistered(user: {email:string, password:string}): boolean{
    let registered: boolean = false;
    this.tab.forEach((tmp: {email:string, password:string}) => {
      if (user.email == tmp.email && user.password == tmp.password) {
        registered = true;
      }
    });
    return registered;
  }

  register(user: {email:string, password:string, firstName:string, lastName:string}) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post("http://172.16.29.62:3000/users", JSON.stringify(user), options)
      .map(response => response.json())
      .catch((err: Error) => {
        return Observable.throw('Server error');
      })
      .subscribe();
  }


}
