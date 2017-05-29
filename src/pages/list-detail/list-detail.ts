import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { ListService } from '../../providers/list-service';

import { ItemEditPage } from '../item-edit/item-edit';

import { Item } from '../../models/item';
import { List } from '../../models/list';

@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html'
})
export class ListDetailPage {
  isReadyToSave: boolean;
  list: List;
  item: Item;
  form: FormGroup;

  constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, formBuilder: FormBuilder, public listService: ListService, public storage: Storage) {
    this.list = navParams.get('list');

    this.form = formBuilder.group({
      nome: ['', Validators.required],
      quantidade: [1, Validators.required],
    });

    console.log('This form: ', this.form);

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  reloadItems() {
    this.listService.reloadItems(this.list)
    .then(items => {
      this.list.items = items as Item[];
    })
  }

  removeItem(item) {
    this.listService.removeItem(item)
    .then(data => {
      console.log('Retorno removeItem: ', data);
      this.reloadItems();
    });
  }

  quantityIncrement(item) {
    let quantidade = this.form.controls.quantidade.value;
    if(quantidade < 99) {
      if (item == null) {
          this.form.patchValue({ 'quantidade': ++quantidade });
      } else {
        item.quantidade++;
      }
    }
  }

  quantityDecrement(item) {
    let quantidade = this.form.controls.quantidade.value;
    if(quantidade > 1) {
      if (item == null) {
          this.form.patchValue({ 'quantidade': --quantidade });
      } else {
        item.quantidade--;
      }
    }
  }

  done(list: List) {
    if(!this.form.valid) { return; }
    this.storage.get('usuario_logado').then((usuario) => {
      var itemForm = this.form.value;
      
      let newItem = new Item(null, usuario.id, itemForm.nome, itemForm.quantidade);
      this.listService.addItem(list, newItem)
      .then(id_inserido => {
        let newInsertedItem = new Item(id_inserido, usuario.id, itemForm.nome, itemForm.quantidade);
        this.list.items.push(newInsertedItem);
      });

      this.form.reset();
    });
  }

  openEditable(item: Item) {
    let editModal = this.modalCtrl.create(ItemEditPage, {item: item});
    editModal.onDidDismiss(item => {
      if(item) {
        console.log('Item editado is: ', item);
        let item_data = {
          'id_item': item.id,
          'itemNome': item.nome,
          'quantidade': item.quantidade,
          'item_comprado': 0
        };
        console.log('item_data is: ', item_data);
        this.listService.updateItem(item_data)
        .then(data => {
          /*let index = this.list.items.find(it => {
            if(it.id == item.id) return true;
          });
          this.list.items[index] = */
          console.log(data);
        })
      }
    });
    editModal.present();
  }
}
