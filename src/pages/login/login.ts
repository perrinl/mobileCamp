import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController} from 'ionic-angular';
import {LoginService} from '../../providers/login-service';
import {TabsPage} from '../tabs/tabs';
import {FormBuilder, Validators} from "@angular/forms";
import {RegisterPage} from '../register/register';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    private email: string;
    private password: string;
    private status: number;
    private error: any;

    public loginForm: any;

    constructor(public storage: Storage, public navCtrl: NavController, public _form: FormBuilder, public alertCtrl: AlertController, private loginService: LoginService) {
        this.loginForm = this._form.group({
            "email": ["", Validators.required],
            "password": ["", Validators.required],
        });
    }

    login() {
        this.loginService.login({email: this.email, password: this.password})
            .subscribe((data) => {
                this.storage.set('token', data.token);
                this.navCtrl.push(TabsPage);
            }, (err) => {
                this.error = err;
                if (this.error.status != 200) {
                    this.status = this.error.status;
                    this.showAlert('Association mail / mot de passe invalide');
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
