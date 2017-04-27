import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddDoctorPage} from "../add-doctor/add-doctor";

@IonicPage()
@Component({
  selector: 'page-doctor',
  templateUrl: 'doctor.html',
})
export class DoctorPage {

  constructor(public navCtrl: NavController) {}

  redirection_addDoctor() {
    this.navCtrl.push(AddDoctorPage);
  }
}
