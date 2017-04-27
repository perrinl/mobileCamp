import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from '../../providers/login-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private firstname: string;
  private lastname: string;
  private email: string;
  private password: string;
  private verif: string;
  message_error: any[];

  public registrationForm:any;

  constructor(public _form:FormBuilder, public alertCtrl: AlertController, private loginService: LoginService) {
    this.registrationForm = this._form.group({
      "firstname":["", Validators.required],
      "lastname":["", Validators.required],
      "email":["", Validators.required],
      "password":["", Validators.required],
      "verif":["", Validators.required],
    });
  }

  register() {
    if (this.password == this.verif) {
      this.loginService.register({
        email: this.email,
        password: this.password,
        firstName: this.firstname,
        lastName: this.lastname
      }).subscribe((data) => this.message_error = data, (err) => {
        this.showAlert("Erreur lors de l'inscription");
      });
    }
    else
      this.showAlert('Les deux mot de passe ne correspondent pas');
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
