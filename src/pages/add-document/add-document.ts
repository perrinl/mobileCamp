import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {DocumentService} from "../../providers/document-service";
import {FormBuilder, Validators} from "@angular/forms";
import {DoctorService} from "../../providers/doctor-sercice";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from '@ionic-native/file-path';
import {TransferObject, FileUploadOptions, FileUploadResult, Transfer} from "@ionic-native/transfer";
import * as mime from 'mime-types';

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
    public natureList: any[];
    public sourceList: any[];
    public doctorList: any[];
    public type: number;
    public path: string;
    public nom: string;
    public textContent: string;
    private img: string;

    constructor(public transfer: Transfer, public filePath: FilePath, public fileChooser: FileChooser, public plt: Platform, public camera: Camera, public doctorService: DoctorService, public alertCtrl: AlertController, public _form: FormBuilder, public documentService: DocumentService, public navCtrl: NavController, public navParams: NavParams) {
        this.addDocumentForm = this._form.group({
            "nom": ["", Validators.required],
            "docteur": ["", Validators.required],
            "nature": ["", Validators.required],
            "source": ["", Validators.required],
            "date": ["", Validators.required],
            "textContent": ["", Validators.nullValidator],
        });
        this.type = 1;
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
        console.log("fileUrl : " + this.path);
        this.documentService.addDocument({
            name: this.nom,
            date: this.date,
            fileUrl: this.path,
            textContent: this.textContent,
            documentSourceId: this.source,
            documentNatureId: this.nature,
            documentTypeId: this.type,
            doctorId: this.docteur,
        }).subscribe((data) => this.navCtrl.pop(), (err) => {
            this.showAlert("Erreur lors de l'ajout du document");
        });
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
                    .then(filePath => {
                        this.uploadFile(filePath);
                    })
                    .catch(err => console.log(err)))
                .catch(e => console.log(e));
        }
    }

    cam() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
        };

        this.camera.getPicture(options).then((imageData) => {
            console.log(imageData);
            this.img = imageData;
            this.uploadFile(imageData);
        }, (err) => {
            console.log(err);
        });
    }

    uploadFile(fileData: string) {
        const fileTransfer: TransferObject = this.transfer.create();

        let options1: FileUploadOptions = {
            mimeType: mime.lookup(fileData),
            fileKey: 'file',
            fileName: fileData.substr(fileData.lastIndexOf('/') + 1),
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };
        fileTransfer.upload(fileData, 'http://172.16.29.62:3000/upload', options1)
            .then((data: FileUploadResult) => {
                this.path = 'http://172.16.29.62:3000/' + JSON.parse(data.response).fileName;
            }, (err) => {
                alert("error" + JSON.stringify(err));
            });
    }
}
