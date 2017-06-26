import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { Api } from './api';

import { List } from '../models/list';
import { Item } from '../models/item';

@Injectable()
export class UserService {

  data: any;

  constructor(public http: Http, public api: Api, public storage: Storage) {
    console.log('Hello UserService Provider');
  }

  loadPreferences() {
    return new Promise(resolve => {
      this.storage.get('usuario_logado').then((usuario) => {
        this.api.get('usuariorest.php/buscarPreferencias/' + usuario.id)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data.map(item => {
              console.log('item is: ', item);
              return item;
            });
            console.log('This data is: ', this.data);
            resolve(this.data);
        });
      });
    });
  }
}
