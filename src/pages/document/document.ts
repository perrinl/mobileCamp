import { Component } from '@angular/core';
import { IonicPage, NavController, App} from 'ionic-angular';
import {AddDocumentPage} from "../add-document/add-document";
import {DocumentService} from "../../providers/document-service";
import {DisplayDocumentPage} from '../display-document/display-document';
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-document',
  templateUrl: 'document.html',
})
export class DocumentPage {
  filterType : string;
  documentList: any[];

  constructor(private app: App, public documentService: DocumentService, public navCtrl: NavController) {
    this.filterType = "name";
  }

  ionViewWillEnter() {
    this.documentService.getDocuments().subscribe((data) => {
      this.documentList = data;
      this.filterType = "name";
    });
  }

  redirection_addDocument() {
    this.navCtrl.push(AddDocumentPage);
  }

  delete(id) {
    this.documentService.deleteDocument(id)
        .subscribe((data) => {
          this.documentService.getDocuments().subscribe((data) => {
            this.documentList = data;
          });
        }, (err) => console.log(err));
  }
   disconnected() {
    localStorage.clear();
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  displayDocumentRedirection(obj: Object) {
    this.navCtrl.push(DisplayDocumentPage, {document: obj});
  }
}
