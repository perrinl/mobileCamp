import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DocumentService {

  constructor(public http: Http) {}

  addDocument(document: {name: string, date:Date, fileUrl: string, textContent: string, documentSourceId:number, documentNatureId:number, documentTypeId:number, doctorId:number}) {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://172.16.29.62:3000/users/"+localStorage.getItem('id')+"/documents", JSON.stringify(document), options)
        .map(response => response.json());
  }

  getDocuments() {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://172.16.29.62:3000/users/"+localStorage.getItem('id')+"/documents", options)
        .map(response => response.json());
  }

  getNature() {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://172.16.29.62:3000/document-natures", options)
        .map(response => response.json());
  }

  getSource() {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://172.16.29.62:3000/document-sources", options)
     .map(response => response.json());
  }

  deleteDocument(id:number) {
    let headers = new Headers({ 'Authorization': localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete("http://172.16.29.62:3000/users/"+localStorage.getItem('id')+"/documents/"+id, options)
        .map(response => response.json());
  }

}
