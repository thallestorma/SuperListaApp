import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { ListMasterPage } from '../pages/list-master/list-master';
import { ListCreatePage } from '../pages/list-create/list-create';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { ItemDetailPage } from '../pages/item-detail/item-detail';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ListMasterPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

