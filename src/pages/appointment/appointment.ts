import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddAppointmentPage} from "../add-appointment/add-appointment";
import {AppointmentService} from "../../providers/appointment-service";
import {CallNumber} from "@ionic-native/call-number";
import {LocalNotifications} from "@ionic-native/local-notifications";

@IonicPage()
@Component({
    selector: 'page-appointment',
    templateUrl: 'appointment.html',
})
export class AppointmentPage {
    private appointmentList: any;

    constructor(private localNotifications: LocalNotifications, private callNumber : CallNumber, private appointmentService: AppointmentService, private navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewWillEnter() {
        this.appointmentService.getAppointments().subscribe((data) => {
            this.appointmentList = data;
        });
    }

    redirection_add_appointment() {
        this.navCtrl.push(AddAppointmentPage);
    }

    doRefresh(refresher) {
        this.appointmentService.getAppointments().subscribe((data) => {
            this.appointmentList = data;
        });
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }

    call(phone: string) {
        this.callNumber.callNumber(phone, true);

}

    delete(id: number) {
        this.appointmentService.delete(id).subscribe((data) => {
            for (let i = 0; i < this.appointmentList.length; ++i) {
                if (this.appointmentList[i].id == id) {
                    this.localNotifications.cancel(this.appointmentList[i].notificationId);
                    this.appointmentList.splice(i--, 1);
                }
            }
        });
    }
}
