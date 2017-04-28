import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddDocumentPage} from "../add-document/add-document";

@IonicPage()
@Component({
  selector: 'page-document',
  templateUrl: 'document.html',
})
export class DocumentPage {

  constructor(public navCtrl: NavController) {}

  redirection_addDocument() {
    this.navCtrl.push(AddDocumentPage);
  }

}
