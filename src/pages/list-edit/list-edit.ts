import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { List } from '../../models/list';

@Component({
  selector: 'page-list-edit',
  templateUrl: 'list-edit.html',
})
export class ListEditPage {
  isReadyToSave: boolean;
  form: FormGroup;
  list: List;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder) {
    this.list = navParams.get('list');

    this.form = new FormGroup({
      id: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required)
    });

    this.form.setValue({
      'id': this.list.id,
      'nome': this.list.nome
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  done(list: List) {
    if(!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
