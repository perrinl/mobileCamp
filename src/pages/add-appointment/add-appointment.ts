import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {DoctorService} from "../../providers/doctor-sercice";
import {AppointmentService} from "../../providers/appointment-service";

@IonicPage()
@Component({
  selector: 'page-add-appointment',
  templateUrl: 'add-appointment.html',
})
export class AddAppointmentPage {
  private addAppointmentForm;
  private name;
  private date;
  private doctor;
  private doctorList;

  constructor(private alertCtrl: AlertController, private appointmentService: AppointmentService, private doctorService : DoctorService, private _form: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.addAppointmentForm = this._form.group({
      "name": ["", Validators.required],
      "date": ["", Validators.required],
      "doctor": ["", Validators.required]
    });
  }

  ionViewWillEnter() {
    this.date = new Date();
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctorList = data;
    });
  }

  addAppointment () {
    this.appointmentService.add({
      name: this.name,
      date: this.date,
      doctor_id: this.doctor,
      notification_id: 1,
    }).subscribe((data) => this.navCtrl.pop(), (err) => {
      this.showAlert("Erreur lors de l'ajout du médecin");
    });
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Erreur !',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
