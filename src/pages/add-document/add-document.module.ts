import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDocumentPage } from './add-document';

@NgModule({
  declarations: [
    AddDocumentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDocumentPage),
  ],
  exports: [
    AddDocumentPage
  ]
})
export class AddDocumentModule {}
