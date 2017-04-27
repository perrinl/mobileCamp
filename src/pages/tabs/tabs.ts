import { Component } from '@angular/core';

import { DocumentPage} from '../document/document';
import { DoctorPage } from '../doctor/doctor';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DocumentPage;
  tab2Root = DoctorPage;

  constructor() {

  }
}
