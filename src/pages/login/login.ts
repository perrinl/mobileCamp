import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController} from 'ionic-angular';
import {LoginService} from '../../providers/login-service';
import {TabsPage} from '../tabs/tabs';
import {FormBuilder, Validators} from "@angular/forms";
import {RegisterPage} from '../register/register';
import {ResetpasswordPage} from '../resetpassword/resetpassword';
import {Storage} from '@ionic/storage';
import {JwtHelper} from 'angular2-jwt';

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
    private tabBarElement: any;

    public jwtHelper: JwtHelper;

    constructor(public storage: Storage, public navCtrl: NavController, public _form: FormBuilder, public alertCtrl: AlertController, private loginService: LoginService) {
        this.loginForm = this._form.group({
            "email": ["", Validators.required],
            "password": ["", Validators.required],
        });
        this.tabBarElement = document.querySelector('#tabs ion-tabbar-section');
        this.jwtHelper = new JwtHelper();
        if (localStorage.getItem('token') != null)
            this.navCtrl.push(TabsPage);
    }
    ionViewWillEnter() {
        this.tabBarElement.style.display = 'none';
    }

    login() {
        this.loginService.login({email: this.email, password: this.password})
            .subscribe((data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', this.jwtHelper.decodeToken(data.token).id);
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

    forget_password() {
        this.navCtrl.push(ResetpasswordPage);
    }
}
