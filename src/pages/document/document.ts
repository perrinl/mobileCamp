import { Component } from '@angular/core';
import { IonicPage, NavController, App} from 'ionic-angular';
import {AddDocumentPage} from "../add-document/add-document";
import {DocumentService} from "../../providers/document-service";
import {DisplayDocumentPage} from '../display-document/display-document';
import {LoginPage} from "../login/login";
import {DoctorService} from "../../providers/doctor-sercice";
import {DocumentPipeDocteur, DocumentPipeNature, DocumentPipeType} from "../../pipes/documentpipe";

@IonicPage()
@Component({
  selector: 'page-document',
  templateUrl: 'document.html',
})
export class DocumentPage {
  filterType : number;
  tabfilter: any[];
  documentList: any[];
  documentNatureList: any[];
  doctorList: Object[];
  documentTypeList: Object[];
  private typeList: Object[];
  public test: any;

  constructor(public documentpipedocteur: DocumentPipeDocteur, public documentpipetype: DocumentPipeType, public documentpipenature: DocumentPipeNature, public doctorservice: DoctorService, public documentService: DocumentService, public navCtrl: NavController) {
    this.documentTypeList = [{id:1, label:"Photo"}, {id:2, label:"Saisie directe"}, {id:3, label:"Transfert de document"}];
    this.filterType = 0;
    this.test = this.documentTypeList;
  }

  ionViewWillEnter() {
    this.doctorservice.getDoctors().subscribe((data) => {
      this.doctorList = data;
      this.doctorservice.getSpecialities().subscribe((data) => {
        this.typeList = data;
        this.documentService.getNature().subscribe((data) => {
          this.documentNatureList = data;
          this.documentService.getDocuments().subscribe((data) => {
            this.documentList = data;
            this.tabfilter = [{id:1, list:this.doctorList}, {id:2, list:this.documentTypeList}, {id:3, list:this.documentNatureList}];
          });
        });
      });
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
