import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';

import { ListMasterPage } from '../pages/list-master/list-master';
import { ListCreatePage } from '../pages/list-create/list-create';
import { ListDetailPage } from '../pages/list-detail/list-detail';
import { ItemCreatePage } from '../pages/item-create/item-create';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ListMasterPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    storage.ready().then(() => {
      // set a key/value
      storage.set('usuario_logado', {
        'id': 1,
        'nome': 'Thalles'
      });

      storage.get('usuario_logado').then((val) => {
        console.log(val);
      })

      // Or to get a key/value pair
      /*storage.get('age').then((val) => {
        console.log('Your age is', val);
      })*/
    });
  }
}

