import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public storage: Storage) {
      storage.ready().then(() => {
          storage.get('token').then((val) => {
              console.log(val);
          })
      });
  }

}
