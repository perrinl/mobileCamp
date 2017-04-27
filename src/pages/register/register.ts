import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from '../../providers/login-service';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
        console.log(err)
        console.log(err._body)
        console.log(err._body.message)
        this.showAlert(err._body);
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
