import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

/*
  Generated class for the ListService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ListService {

  constructor(public http: Http, public api: Api) {
    console.log('Hello ListService Provider');
  }

  data: any;

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.

      this.api.get('listasrest.php/todos')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
      });
    });
  }

/*  add() {
  	var data = {id_lista: this.data.username};
  	this.http.post('http://192.168.1.229/superlista/rest/listasrest.php/criarLista', )
  }*/
}
