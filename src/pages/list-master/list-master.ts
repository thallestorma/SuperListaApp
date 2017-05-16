import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ListDetailPage } from '../list-detail/list-detail';
import { ItemCreatePage } from '../item-create/item-create';
import { ListCreatePage } from '../list-create/list-create';

import { Storage } from '@ionic/storage';

import { Items } from '../../providers/providers';
import { ListService } from '../../providers/list-service';
import { Item } from '../../models/item';
import { List } from '../../models/list';

import { Api } from '../../providers/api';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentLists: List[];
  data: any;

  constructor(public api: Api, public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public listService: ListService, public storage: Storage) {
    //this.currentItems = this.items.query();
    this.loadList();
  }

  loadList(forceReload = false){
    this.listService.load(forceReload)
    .then(data => {
      this.currentLists = data;
      console.log('currentLists is: ', data);
    });
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    console.log('ListMasterPage did load');
  }

  ionViewWillEnter() {
    console.log('ListMasterPage will enter');
  }

  ionViewDidEnter() {
    console.log('ListMasterPage did enter');
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addList() {
    let addModal = this.modalCtrl.create(ListCreatePage);
    addModal.onDidDismiss(lista => {
      if (lista) {
        console.log('lista is: ', lista);
        this.storage.get('usuario_logado').then((usuario) => {
          let user_data = {
            'id_usuario': usuario.id,
            'nomeLista': lista.nome
          };

          this.listService.add(user_data)
          .then(data => {
            console.log('Retorno addList: ', data);
            this.loadList(true);
          });
        });
      }
    });
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(list: List) {
    this.navCtrl.push(ListDetailPage, {
      list: list
    });
  }
}
