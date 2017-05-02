import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {DocumentService} from "../../providers/document-service";
import {FormBuilder, Validators} from "@angular/forms";
import {DoctorService} from "../../providers/doctor-sercice";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from '@ionic-native/file-path';


@IonicPage()
@Component({
  selector: 'page-add-document',
  templateUrl: 'add-document.html',
})
export class AddDocumentPage {
  public addDocumentForm: any;
  public docteur: number;
  public nature: number;
  public source: number;
  public date: Date;
  public natureList : any[];
  public sourceList : any[];
  public doctorList : any[];
  public base64Image: string;
  public type: string;

  constructor(public filePath : FilePath, public fileChooser : FileChooser, public plt: Platform, public camera: Camera, public doctorService: DoctorService, public alertCtrl: AlertController, public _form: FormBuilder, public documentService: DocumentService, public navCtrl: NavController, public navParams: NavParams) {
    this.addDocumentForm = this._form.group({
      "docteur": ["", Validators.required],
      "nature": ["", Validators.required],
      "source": ["", Validators.required],
      "date": ["", Validators.required],
    });
  }

  ionViewWillEnter() {
    this.date = new Date();
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctorList = data;
    });
    this.documentService.getNature().subscribe((data) => {
      this.natureList = data;
    });
    this.documentService.getSource().subscribe((data) => {
      this.sourceList = data;
    });
  }

  addDocument() {
    this.documentService.addDocument({
      docteur: this.docteur,
      nature: this.nature,
      source: this.source,
      date: this.date,
      type: this.type,
    })/*.subscribe((data) => this.navCtrl.pop(), (err) => {
      this.showAlert("Erreur lors de l'ajout du document");
    });*/
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Erreur !',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  choose() {
    if (this.plt.is('android')) {
      this.fileChooser.open()
          .then(uri => this.filePath.resolveNativePath(uri)
              .then(filePath => alert("Fichier ajouté avec succès"))
              .catch(err => console.log(err)))
          .catch(e => console.log(e));
    }
  }

  cam() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.base64Image);
    }, (err) => {
      console.log(err);
    });
  }
}
