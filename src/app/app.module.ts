import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { ListMasterPage } from '../pages/list-master/list-master';
import { ListCreatePage } from '../pages/list-create/list-create';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { ItemDetailPage } from '../pages/item-detail/item-detail';

import { Api } from '../providers/api';
import { ListService } from '../providers/list-service';
import { Items } from '../mocks/providers/items';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '645a5ca6'
  }
};

let pages = [
  MyApp,
  HomePage,
  ListMasterPage,
  ListCreatePage,
  ItemDetailPage,
  ItemCreatePage
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    Camera,
    StatusBar,
    SplashScreen,
    Api,
    Items,
    ListService,

    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar'
    }),
    HttpModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
