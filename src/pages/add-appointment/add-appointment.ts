import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {DoctorService} from "../../providers/doctor-sercice";
import {AppointmentService} from "../../providers/appointment-service";
import {LocalNotifications} from "@ionic-native/local-notifications";

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

    constructor(private localNotifications: LocalNotifications, private alertCtrl: AlertController, private appointmentService: AppointmentService, private doctorService: DoctorService, private _form: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
        this.addAppointmentForm = this._form.group({
            "name": ["", Validators.required],
            "date": ["", Validators.required],
            "doctor": ["", Validators.required],
            "hour": ["", Validators.required]
        });
    }

    ionViewWillEnter() {
        this.date = new Date();
        this.doctorService.getDoctors().subscribe((data) => {
            this.doctorList = data;
        });
    }

    addAppointment() {
        console.log(this.date);
        this.localNotifications.schedule({
            id: 2154,
            title: 'Rappel rendez-vous fdp',
            text: this.name,
            at: new Date(new Date().getTime() + 3600),
            sound: null
        });

        this.appointmentService.add({
            name: this.name,
            date: new Date(this.date),
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
