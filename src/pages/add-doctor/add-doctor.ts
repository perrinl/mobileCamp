import { Component } from '@angular/core';
import {IonicPage, AlertController, NavController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {DoctorService} from "../../providers/doctor-sercice";

@IonicPage()
@Component({
  selector: 'page-add-doctor',
  templateUrl: 'add-doctor.html',
})
export class AddDoctorPage {
  public addDoctorform: any;
  public modeKeys: any[];
  public nom: string;
  public telephone: string;
  public adresse: string;
  public specialite: number;

  constructor(public navCtrl: NavController, public _form: FormBuilder, public alertCtrl: AlertController, private doctorservice : DoctorService) {
    this.addDoctorform = this._form.group({
      "nom": ["", Validators.required],
      "telephone": ["", Validators.required],
      "adresse": ["", Validators.required],
      "specialite": ["", Validators.required],
    });
  }

  ionViewWillEnter() {
    this.doctorservice.getSpecialities().subscribe((data) => {
      this.modeKeys = data;
    });
  }

  ajouter() {
    this.doctorservice.ajouter({
      lastName: this.nom,
      phone: this.telephone,
      address: this.adresse,
      type_id: this.specialite
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
