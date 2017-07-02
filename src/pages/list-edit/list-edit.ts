import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

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
  usuarioLogado: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, formBuilder: FormBuilder, public listService: ListService, public storage: Storage) {
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

    this.storage.get('usuario_logado').then((usuario) => {
      this.usuarioLogado = usuario;
      console.log('usuarioLogado: ', this.usuarioLogado);
    });
    console.log('usuarios: ', this.list.usuarios);

  }

  done(list: List) {
    if(!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  shareList(list) {
    let loading = this.loadingCtrl.create({
      content: 'Compartilhando...'
    });

    loading.present();

    let share_list_data = {
      'id_lista': list.id,
      'contribuinteEmail': this.emailShare
    };

    this.listService.shareList(share_list_data)
      .then(data => {
        console.log('Contribuinte adicionado: ', data);

        this.list.usuarios.push(data);

        this.emailShare = '';

        loading.dismiss();
      }, error => {
        console.log('Erro ao adicionar contribuinte: ', error);

        loading.dismiss();

        let alert = this.alertCtrl.create({
          title: 'Ooops!',
          subTitle: error,
          buttons: ['Ok']
        });

        alert.present();
      });
  }

  unshareList(list, user) {
    let loading = this.loadingCtrl.create({
      content: 'Removendo...'
    });

    loading.present();

    let share_list_data = {
      'id_lista': list.id,
      'contribuinteEmail': user.email
    };

    this.listService.unshareList(share_list_data)
      .then(data => {
        console.log('Contribuinte removido: ', data);

        let index = this.list.usuarios.indexOf(user);
        if(index > -1) {
          this.list.usuarios.splice(index, 1);
        }

        loading.dismiss();
      }, error => {
        console.log('Erro ao remover contribuinte: ', error);

        loading.dismiss();

        let alert = this.alertCtrl.create({
          title: 'Ooops!',
          subTitle: error,
          buttons: ['Ok']
        });

        alert.present();
      });
  }
}
