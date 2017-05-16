import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Compras família",
    "profilePic": "assets/img/speakers/familia.jpg",
    "subItems": [
      {
        "name": "Arroz",
        "quantity": 1
      },
      {
        "name": "Azeite",
        "quantity": 2
      }
    ]
  };


  constructor(public http: Http) {
    let items = [
      {
         "name": "Compras família",
         "profilePic": "assets/img/speakers/familia.jpg",
         "subItems": [
           {
             "name": "Arroz",
             "quantity": 1
           },
           {
             "name": "Azeite",
             "quantity": 2
           }
         ]
       },
       {
         "name": "Compras churrasco",
         "profilePic": "assets/img/speakers/churrasco.jpg",
         "subItems": [
           {
             "name": "Costela",
             "quantity": 1
           },
           {
             "name": "Picanha",
             "quantity": 1
           },
           {
             "name": "Cerveja",
             "quantity": 12
           }
         ]
       },
       {
         "name": "Festa de aniversário",
         "profilePic": "assets/img/speakers/aniversario.jpg",
         "subItems": [
           {
             "name": "Bolo",
             "quantity": 1
           },
           {
             "name": "Refri",
             "quantity": 3
           },
           {
             "name": "Salgadinhos",
             "quantity": 3
           },
           {
             "name": "Pratos descartáveis",
             "quantity": 2
           },
           {
             "name": "Talheres descartáveis",
             "quantity": 2
           }

         ]
       }
     ];

     for(let item of items) {
       //this.items.push(new Item(item));
     }
  }

  query(params?: any) {
    if(!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for(let key in params) {
        let field = item[key];
        if(typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if(field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
