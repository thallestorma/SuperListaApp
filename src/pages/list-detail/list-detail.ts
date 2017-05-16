import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { ListService } from '../../providers/list-service';

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

  constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public listService: ListService) {
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

  deleteSubItem(subItem) {
    //this.item.subItems.splice(this.item.subItems.indexOf(subItem), 1);
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
    var itemForm = this.form.value;
    var newItem = new Item(itemForm.nome, itemForm.quantidade);

    this.listService.addItem(list, newItem)
    .then(data => {
      console.log('Retorno addItem: ', data);
      this.list.items.push(newItem);
    })

    this.form.reset();
  }
}
