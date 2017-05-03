import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayDocumentPage } from './display-document';

@NgModule({
  declarations: [
    DisplayDocumentPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayDocumentPage),
  ],
  exports: [
    DisplayDocumentPage
  ]
})
export class DisplayDocumentModule {}
