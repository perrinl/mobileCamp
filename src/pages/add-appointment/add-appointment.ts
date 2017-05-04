import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {DoctorService} from "../../providers/doctor-sercice";
import {AppointmentService} from "../../providers/appointment-service";
import {ILocalNotification, LocalNotifications} from "@ionic-native/local-notifications";
import * as moment from 'moment';
import 'moment-timezone';

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
    private hour;
    private notificationHour;

    constructor(private localNotifications: LocalNotifications, private alertCtrl: AlertController, private appointmentService: AppointmentService, private doctorService: DoctorService, private _form: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
        this.addAppointmentForm = this._form.group({
            "name": ["", Validators.required],
            "date": ["", Validators.required],
            "doctor": ["", Validators.required],
            "hour": ["", Validators.required],
            "notificationHour": ["", Validators.required]
        });
    }

    ionViewWillEnter() {
        this.date = new Date();
        this.doctorService.getDoctors().subscribe((data) => {
            this.doctorList = data;
        });
    }

    addAppointment() {
        let notificationId: number = Date.now();
        console.log(this.date);
        console.log(this.doctor);

        this.localNotifications.schedule({
            id: notificationId,
            title: 'Rappel rendez-vous',
            text: 'Rendez-vous avec Dr. '+ this.doctor.lastName + ' pour le ' + this.date + ' à ' + this.hour,
            at: new Date(new Date().getTime() + this.notificationHour * 1000)
        });

        // console.log(this.hour);
        // console.log(this.date);
        this.appointmentService.add({
            name: this.name,
            date: moment(this.date + ' ' + this.hour).toISOString(),
            doctor_id: this.doctor.id,
            notification_id: notificationId,
        }).subscribe((data) => this.navCtrl.pop(), (err) => {
            console.log(err);
            this.showAlert("Erreur lors de l'ajout du rendez-vous");
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
