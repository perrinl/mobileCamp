import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {LoginService} from '../../providers/login-service';
import {TabsPage} from '../tabs/tabs';
import {FormBuilder, Validators} from "@angular/forms";
import {RegisterPage} from '../register/register';

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
    private str: { error: boolean, token: string };
    private status: number;
    private error: any;

    public loginForm: any;

    constructor(public navCtrl: NavController, public _form: FormBuilder, public alertCtrl: AlertController, private loginService: LoginService) {
        this.loginForm = this._form.group({
            "email": ["", Validators.required],
            "password": ["", Validators.required],
        });
    }

    login() {
        let app: this;
        this.loginService.login({email: this.email, password: this.password})
            .subscribe((data) => this.str = data, (err) => {
                this.error = err;
                if (this.error.status != 200) {
                    this.status = this.error.status;
                    this.showAlert('Association mail / mot de passe invalide');
                } else {
                    app.navCtrl.push(TabsPage);
                }
            });
    }

    showAlert(msg: string) {
        let alert = this.alertCtrl.create({
            title: 'Erreur !',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    }

    register_redirection() {
        this.navCtrl.push(RegisterPage);
    }
}
