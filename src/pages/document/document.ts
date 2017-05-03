import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {AddDocumentPage} from "../add-document/add-document";
import {DocumentService} from "../../providers/document-service";
import {DisplayDocumentPage} from '../display-document/display-document';

@IonicPage()
@Component({
  selector: 'page-document',
  templateUrl: 'document.html',
})
export class DocumentPage {
  filterType : string;
  documentList: any[];

  constructor(public documentService: DocumentService, public navCtrl: NavController) {
    this.filterType = "id";
  }

  ionViewWillEnter() {
    this.documentService.getDocuments().subscribe((data) => {
      this.documentList = data;
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

  displayDocumentRedirection(obj: Object) {
    this.navCtrl.push(DisplayDocumentPage, {document: obj});
  }
}
