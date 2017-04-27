import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-add-doctor',
  templateUrl: 'add-doctor.html',
})
export class AddDoctorPage {
  public addDoctorform: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _form: FormBuilder) {
    this.addDoctorform = this._form.group({
      "nom": ["", Validators.required],
      "telephone": ["", Validators.required],
      "adresse": ["", Validators.required],
      "specialite": ["", Validators.required],
    });
  }

  ajouter() {
    alert("test");
  }

}
