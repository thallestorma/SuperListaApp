import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { List } from '../../models/list';

import { ListService } from '../../providers/list-service';

@Component({
  selector: 'page-list-edit',
  templateUrl: 'list-edit.html',
})
export class ListEditPage {
  isReadyToSave: boolean;
  form: FormGroup;
  list: List;
  emailShare: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public listService: ListService) {
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

  shareList(list) {
    let share_list_data = {
      'id_lista': list.id,
      'contribuinteEmail': this.emailShare
    };
    this.listService.shareList(share_list_data)
      .then(data => {

      });
  }
}
