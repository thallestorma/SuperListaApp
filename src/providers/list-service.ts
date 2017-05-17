import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { Api } from './api';

import { List } from '../models/list';
import { Item } from '../models/item';

/*
  Generated class for the ListService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ListService {

  constructor(public http: Http, public api: Api, public storage: Storage) {
    console.log('Hello ListService Provider');
  }

  data: any;

  load(forceReload) {
    if (this.data && !forceReload) {
      // already loaded data
      console.log('already loaded data: ', this.data);
      console.log('forceReload is: ', forceReload);
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.storage.get('usuario_logado').then((usuario) => {
        this.api.get('listasrest.php/todos')
          .map(res => res.json())
          .subscribe(data => {

            this.data = data.map(lista => {

              var itens = lista.itens.map(item => {
                return new Item(usuario.id, item.nome, item.quantidade);
              });

              console.log('itens is: ', itens);
              console.log('Lista is: ', lista);

              return new List(lista.id, lista.nome, itens);
              //return lista;
              //return new List(lista.nome, items);
            });
            console.log('This data is: ', this.data);
            // we've got back the raw data, now generate the core schedule data
            // and save the data for later reference
            //this.data = data;
            resolve(this.data);
        });
      });
    });
  }

  add(user_data: any) {
    return new Promise(resolve => {
    	this.api.post('listasrest.php/criarLista', user_data)
        .map(res => res.json())
        .subscribe(data => {
          console.log('Lista adicionada com sucesso: ', user_data);
          resolve(data);
      }, error => {
        console.log("Oooops!");
      });
    })
  }


  addItem(list: List, newItem: Item) {
    let itemData = {
      'id_lista': list.id,
      'itemNome': newItem.nome,
      'quantidade': newItem.quantidade,
      'id_usuario_add': newItem.id_usuario_add
    };

    return new Promise(resolve => {
      this.api.post('itemrest.php/criarItem', itemData)
        .map(res => res.json())
        .subscribe(data => {
          console.log('Item adicionado com sucesso: ', itemData);
          resolve(data);
        }, error => {
          console.log("Oooops!");
        });
    });
  }

  removeList(list_data: any) {
    return new Promise(resolve => {
      this.api.delete('listasrest.php/excluirLista?id_lista=' + list_data.id)
        .map(res => res.json())
        .subscribe(data => {
          console.log('Lista removida com sucesso: ', data);
        }, error => {
          console.log('Oooops!');
        });
    });
  }

  removeItem(item_data: any) {
    return new Promise(resolve => {
      this.api.delete('itemrest.php/excluirItem/' + item_data.id)
        .map(res => res.json())
        .subscribe(data => {
          console.log('Item removido com sucesso: ', data);
        }, error => {
          console.log('Oooops!');
        });
    });
  }
}
