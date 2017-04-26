import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from '../../providers/login-service'

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
      this.loginService.register({email: this.email, password: this.password, firstName: this.firstname, lastName: this.lastname});
    }
    else
      this.showAlert();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Erreur !',
      subTitle: 'Les deux mot de passe ne correspondent pas',
      buttons: ['OK']
    });
    alert.present();
  }

}
