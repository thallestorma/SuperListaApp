import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import { ListDetailPage } from '../list-detail/list-detail';
import { ListCreatePage } from '../list-create/list-create';

import { Storage } from '@ionic/storage';

import { ListService } from '../../providers/list-service';
import { List } from '../../models/list';
import { Item } from '../../models/item';

import { Api } from '../../providers/api';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentLists: List[];
  data: any;

  constructor(public api: Api, public navCtrl: NavController, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public listService: ListService, public storage: Storage) {
    this.loadList();
  }

  loadList(forceReload = false){
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    this.listService.load(forceReload)
    .then(data => {
      this.currentLists = data;
      loading.dismiss();
    });
  }

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

  removeList(list) {
    this.listService.removeList(list)
    .then(data => {
      console.log('Retorno removeList: ', data);
      this.loadList(true);
    });
  }

  openItem(list: List) {
    this.navCtrl.push(ListDetailPage, {
      list: list
    });
  }
}
