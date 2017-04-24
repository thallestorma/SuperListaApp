import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { Item } from '../../models/item';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public viewCtrl: ViewController, formBuilder: FormBuilder) {
    this.item = navParams.get('item') || items.defaultItem;

    this.form = formBuilder.group({
      name: ['', Validators.required],
      quantity: [''],
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  deleteSubItem(subItem) {
    this.item.subItems.splice(this.item.subItems.indexOf(subItem), 1);
  }

  quantityIncrement(subItem) {
    let quantity;
    if (typeof subItem == 'undefined') {
      quantity = this.form.controls.quantity.value;
      this.form.patchValue({ 'quantity': ++quantity });
      console.log(this.form.controls.quantity.value);
    } else {
      subItem.quantity++;
    }
  }

  quantityDecrement(subItem) {
    let quantity;
    if (typeof subItem == 'undefined') {
      quantity = this.form.controls.quantity.value;
      this.form.patchValue({ 'quantity': --quantity });
      console.log(this.form.controls.quantity.value);
    } else {
      subItem.quantity--;
    }
  }

  done() {
    if(!this.form.valid) { return; }
    this.item.subItems.push(this.form.value);
    this.form.reset();
  }
}
