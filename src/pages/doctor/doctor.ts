import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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

  constructor(public doctorService: DoctorService, public callNumber: CallNumber, public navCtrl: NavController, private doctorservice : DoctorService) {
  }

  ionViewWillEnter() {
    this.doctorservice.getDoctors().subscribe((data) => {
      this.doctorList = data;
    });
    this.doctorservice.getSpecialities().subscribe((data) => {
      this.typeList = data;
    });
  }

  doRefresh(refresher) {
    this.doctorservice.getDoctors().subscribe((data) => {
      this.doctorList = data;
    });
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  redirection_addDoctor() {
    this.navCtrl.push(AddDoctorPage);
  }

  call(number) {
    this.callNumber.callNumber(number, true);
  }

  delete(id) {
    this.doctorService.deleteDoctor(id)
        .subscribe((data) => {
          this.doctorservice.getDoctors().subscribe((data) => {
            this.doctorList = data;
          });
        }, (err) => console.log(err));
  }
}
