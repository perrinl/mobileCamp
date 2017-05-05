import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Transfer, TransferObject} from "@ionic-native/transfer";
import {File} from '@ionic-native/file';
import {FileOpener} from "@ionic-native/file-opener";
import * as mime from 'mime-types';

@IonicPage()
@Component({
  selector: 'page-display-document',
  templateUrl: 'display-document.html',
})
export class DisplayDocumentPage {
  private obj;

  constructor(private transfer: Transfer, private fileOpener: FileOpener, public file: File, public navCtrl: NavController, public navParams: NavParams) {
    this.obj = this.obj = navParams.get("document");
  }

  downloadDocument() {
    const fileTransfer: TransferObject = this.transfer.create();
    const fileLink = this.file.externalDataDirectory + this.obj.fileUrl.substring(this.obj.fileUrl.lastIndexOf('/') + 1);
    fileTransfer.download(this.obj.fileUrl, fileLink).then(() => {
      this.fileOpener.open(fileLink, mime.lookup(fileLink));
    });
  }

}
