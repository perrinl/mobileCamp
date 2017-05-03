import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-display-document',
  templateUrl: 'display-document.html',
})
export class DisplayDocumentPage {
  private obj: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.obj = this.obj = navParams.get("document");
    console.log(this.obj);
  }

}
