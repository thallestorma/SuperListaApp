import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Item } from '../../models/item';

@Component({
  selector: 'page-item-edit',
  templateUrl: 'item-edit.html',
})
export class ItemEditPage {
  isReadyToSave: boolean;
  form: FormGroup;
  item: Item;

  constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder) {
    this.item = navParams.get('item');

    this.form = new FormGroup({
      id: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      quantidade: new FormControl('', Validators.required)
    });

    this.form.setValue({
      'id': this.item.id,
      'nome': this.item.nome,
      'quantidade': this.item.quantidade
    });

  	this.form.valueChanges.subscribe((v) => {
  	  this.isReadyToSave = this.form.valid;
  	});
  }

  quantityIncrement(item) {
    let quantidade = this.form.controls.quantidade.value;
    if(quantidade < 99) {
      this.form.patchValue({ 'quantidade': ++quantidade });
    }
  }

  quantityDecrement(item) {
    let quantidade = this.form.controls.quantidade.value;
    if(quantidade > 1) {
      this.form.patchValue({ 'quantidade': --quantidade });
    }
  }

  done(item: Item) {
    if(!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
