import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDoctorPage } from './add-doctor';

@NgModule({
  declarations: [
    AddDoctorPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDoctorPage),
  ],
  exports: [
    AddDoctorPage
  ]
})
export class AddDoctorModule {}
