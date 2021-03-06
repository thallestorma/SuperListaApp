import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';
import { ItemCreatePage } from '../item-create/item-create';

import { Items } from '../../providers/providers';
import { ListService } from '../../providers/list-service';
import { Item } from '../../models/item';

import { Http } from '@angular/http';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  data: any;

  constructor(public http: Http, public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public listService: ListService) {
    //this.currentItems = this.items.query();
    this.loadList();
  }

  loadList(){
    this.listService.load()
    .then(data => {
      this.currentItems = data;
      console.log(data);
    });
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        var link = 'http://192.168.1.229/superlista/rest/itemrest.php/criarItem';
        var data = {"id_lista": 1, "itemNome": item.nome, "quantidade": item.quantidade};
        
        this.http.post(link, data)
        .subscribe(data => {
         
        }, error => {
            console.log("Oooops!");
        });
        //this.items.add(item);
      }
    })
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
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
