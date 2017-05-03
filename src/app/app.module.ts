import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DocumentPage } from '../pages/document/document';
import { DoctorPage } from '../pages/doctor/doctor';
import { AddDoctorPage } from '../pages/add-doctor/add-doctor';
import { AddDocumentPage } from '../pages/add-document/add-document';
import {ResetpasswordPage} from '../pages/resetpassword/resetpassword'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../providers/login-service';
import { DoctorService } from '../providers/doctor-sercice';
import { DocumentService } from '../providers/document-service';
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";
import {DoctorPipe} from "../pipes/doctor";
import {Filter} from "../pipes/filter";
import {CallNumber} from "@ionic-native/call-number";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FilePath} from '@ionic-native/file-path';
import {FileChooser} from "@ionic-native/file-chooser";
import {Transfer} from "@ionic-native/transfer";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    RegisterPage,
    DocumentPage,
    DoctorPage,
    AddDoctorPage,
    AddDocumentPage,
    DoctorPipe,
    Filter,
    ResetpasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    RegisterPage,
    DocumentPage,
    DoctorPage,
    AddDoctorPage,
    AddDocumentPage,
    ResetpasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    DoctorService,
    CallNumber,
    DocumentService,
    Camera,
    FilePath,
    FileChooser,
    Transfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
