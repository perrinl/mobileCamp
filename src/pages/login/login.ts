import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import { TabsPage } from '../tabs/tabs';
import {FormBuilder, Validators} from "@angular/forms";
import { RegisterPage } from '../register/register';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private email: string;
  private password: string;

  public loginForm:any;

  constructor(public navCtrl: NavController, public _form:FormBuilder, public navParams: NavParams, private loginService: LoginService) {
    this.loginForm = this._form.group({
      "email":["", Validators.required],
      "password":["", Validators.required],
    });
  }

  login() {
    if (this.loginService.isRegistered({email: this.email, password: this.password}) == true) {
      this.navCtrl.push(TabsPage);
    }
    else {
      console.log("Pas les bons indentifiants");
    }
  }

  register_redirection() {
    this.navCtrl.push(RegisterPage);
  }
}
