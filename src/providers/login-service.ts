import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http, RequestOptions, Headers} from "@angular/http";

@Injectable()
export class LoginService {
  constructor(private http:Http) {
  }

  login(user:{email:string, password:string}) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post("http://172.16.29.62:3000/login", JSON.stringify(user), options)
          .map(response => response.json());
  }

  register(user: {email:string, password:string, firstName:string, lastName:string}) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://172.16.29.62:3000/users", JSON.stringify(user), options)
      .map(response => response.json());
  }

}
