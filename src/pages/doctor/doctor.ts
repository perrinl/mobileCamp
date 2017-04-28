import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import {AddDoctorPage} from "../add-doctor/add-doctor";
import {DoctorService} from "../../providers/doctor-sercice";
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-doctor',
  templateUrl: 'doctor.html',
})
export class DoctorPage {
  private doctorList: Object[];
  private typeList: Object[];

  constructor(public doctorService: DoctorService, public callNumber: CallNumber, public loadingCtrl: LoadingController, public navCtrl: NavController, private doctorservice : DoctorService) {
  }

  ionViewWillEnter() {
    this.doctorservice.getDoctors().subscribe((data) => {
      this.doctorList = data;
    });
    this.doctorservice.getSpecialities().subscribe((data) => {
      this.typeList = data;
    });
  }

  redirection_addDoctor() {
    this.navCtrl.push(AddDoctorPage);
  }

  call(number) {
    this.callNumber.callNumber(number, true);
  }

  delete(id) {
    this.doctorService.deleteDoctor(id);
  }
}
