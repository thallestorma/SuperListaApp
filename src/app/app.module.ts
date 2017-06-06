import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';

import { ListMasterPage } from '../pages/list-master/list-master';
import { ListCreatePage } from '../pages/list-create/list-create';
import { ListDetailPage } from '../pages/list-detail/list-detail';
import { ListEditPage } from '../pages/list-edit/list-edit';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { ItemEditPage } from '../pages/item-edit/item-edit';

import { Api } from '../providers/api';
import { ListService } from '../providers/list-service';

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
  ListDetailPage,
  ListEditPage,
  ItemCreatePage,
  ItemEditPage
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
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
