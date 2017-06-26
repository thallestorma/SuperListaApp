import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { Api } from './api';

import { List } from '../models/list';
import { Item } from '../models/item';

@Injectable()
export class ListService {

  data: any;

  constructor(public http: Http, public api: Api, public storage: Storage) {
    console.log('Hello ListService Provider');
  }

  load(forceReload) {
    if (this.data && !forceReload) {
      // already loaded data
      console.log('already loaded data: ', this.data);
      console.log('forceReload is: ', forceReload);
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.storage.get('usuario_logado').then((usuario) => {
        this.api.get('listasrest.php/todos')
          .map(res => res.json())
          .subscribe(data => {
            this.data = data.map(lista => {
              var itens = lista.itens.map(item => {
                console.log('Item comprado is: ', item.item_comprado);
                let newItem = new Item(item.id, usuario.id, item.nome, item.quantidade, item.item_comprado);
                console.log('newItem is: ', newItem);
                return newItem;
              });

              console.log('itens is: ', itens);
              console.log('Lista is: ', lista);

              return new List(lista.id, lista.nome, itens);
            });
            console.log('This data is: ', this.data);
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

  reloadItems(list: List) {
    return new Promise(resolve => {
      this.api.get('itemrest.php/listarItens/' + list.id)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data.map(item => {
          return new Item(item.id, item.id_usuario_add, item.nome, item.quantidade, item.item_comprado);
        });
        resolve(this.data);
      }, error => {
        console.log('Oooops! ', error);
      });
    });
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
          console.log('Item adicionado com sucesso: ', data);
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
          resolve(data);
        }, error => {
          console.log('Oooops!');
        });
    });
  }

  removeItem(item_data: any) {
    console.log('item_data is: ', item_data);
    return new Promise(resolve => {
      this.api.delete('itemrest.php/excluirItem?id_item=' + item_data.id)
        .map(res => res.json())
        .subscribe(data => {
          console.log('Item removido com sucesso: ', data);
          resolve(data);
        }, error => {
          console.log('Oooops!');
        });
    });
  }

  updateItem(item_data: any) {
    return new Promise(resolve => {
      this.api.put('itemrest.php/atualizarItem', item_data)
        .map(res => res.json())
        .subscribe(data => {
          console.log('Item atualizado com sucesso: ', data);
          resolve(data);
        }, error => {
          console.log('Oooops!');
        });
    });
  }

  updateList(list_data: any) {
    return new Promise(resolve => {
      this.api.put('listasrest.php/atualizarLista', list_data)
        .map(res => res.json())
        .subscribe(data => {
          console.log('Lista atualizada com sucesso: ', data);
          resolve(data);
        }, error => {
          console.log('Oooops!');
        });
    });
  }

  shareList(share_list_data: any) {
    return new Promise(resolve => {
      this.api.put('listasrest.php/adicionarcontribuinte', share_list_data)
        .map(res => res.json())
        .subscribe(data => {
          console.log('Lista compartilhada com sucesso: ', data);
          resolve(data);
        }, error => {
          console.log('Oooops!');
        });
    });
  }
}
