import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { Item } from '../../models/item';
import { List } from '../../models/list';

@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html'
})
export class ListDetailPage {
  isReadyToSave: boolean;

  list: List;

  form: FormGroup;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public viewCtrl: ViewController, formBuilder: FormBuilder) {
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

  quantityIncrement(subItem) {
    let quantity = this.form.controls.quantidade.value;
    if(quantity < 99) {
      if (subItem == null) {
          this.form.patchValue({ 'quantidade': ++quantity });
      } else {
        subItem.quantity++;
      }
    }
  }

  quantityDecrement(subItem) {
    let quantity = this.form.controls.quantidade.value;
    if(quantity > 1) {
      if (subItem == null) {
          this.form.patchValue({ 'quantidade': --quantity });
      } else {
        subItem.quantity--;
      }
    }
  }

  done(list: List) {
    if(!this.form.valid) { return; }
    var itemForm = this.form.value;
    console.log('This form value: ', this.form.value);
    var newItem = new Item(itemForm.nome, itemForm.quantidade);
    console.log('This is the IN list: ', list);
    //this.list.items.push(this.form.value);
    //this.form.reset();
  }
}
