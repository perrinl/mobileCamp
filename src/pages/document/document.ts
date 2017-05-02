import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {AddDocumentPage} from "../add-document/add-document";

@IonicPage()
@Component({
  selector: 'page-document',
  templateUrl: 'document.html',
})
export class DocumentPage {
  tabs : any[];
  filterType : string;

  constructor(public navCtrl: NavController) {
    this.filterType = "id";
    this.tabs = [{
      "id": 1,
      "name": "A green door",
      "price": 12.50,
    },
      {
        "id": 2,
        "name": "C green door",
        "price": 14.50,
      },
      {
      "id": 3,
        "name": "B green door",
        "price": 13.50,
      }];
  }

  redirection_addDocument() {
    this.navCtrl.push(AddDocumentPage);
  }

}
