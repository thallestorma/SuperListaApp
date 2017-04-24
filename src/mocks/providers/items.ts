import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "subItems": [
      {
        "name": "Sub item 1",
        "quantity": 3
      },
      {
        "name": "Sub item 2",
        "quantity": 3
      }
    ]
  };


  constructor(public http: Http) {
    let items = [
      {
         "name": "Burt Bear",
         "profilePic": "assets/img/speakers/bear.jpg",
         "subItems": [
           {
             "name": "Sub item 1",
             "quantity": 3
           },
           {
             "name": "Sub item 2",
             "quantity": 3
           }
         ]
       },
       {
         "name": "Charlie Cheetah",
         "profilePic": "assets/img/speakers/cheetah.jpg",
         "subItems": [
           {
             "name": "Sub item 1",
             "quantity": 3
           },
           {
             "name": "Sub item 2",
             "quantity": 3
           }
         ]
       },
       {
         "name": "Donald Duck",
         "profilePic": "assets/img/speakers/duck.jpg",
         "subItems": [
           {
             "name": "Sub item 1",
             "quantity": 3
           },
           {
             "name": "Sub item 2",
             "quantity": 3
           },
           {
             "name": "Sub item 3",
             "quantity": 3
           },
           {
             "name": "Sub item 4",
             "quantity": 3
           }
         ]
       },
       {
         "name": "Eva Eagle",
         "profilePic": "assets/img/speakers/eagle.jpg",
         "subItems": [
           {
             "name": "Sub item 1",
             "quantity": 3
           },
           {
             "name": "Sub item 2",
             "quantity": 3
           }
         ]
       },
       {
         "name": "Ellie Elephant",
         "profilePic": "assets/img/speakers/elephant.jpg",
         "subItems": [
           {
             "name": "Sub item 1",
             "quantity": 3
           },
           {
             "name": "Sub item 2",
             "quantity": 3
           }
         ]
       },
       {
         "name": "Molly Mouse",
         "profilePic": "assets/img/speakers/mouse.jpg",
         "subItems": [
           {
             "name": "Sub item 1",
             "quantity": 3
           },
           {
             "name": "Sub item 2",
             "quantity": 3
           }
         ]
       },
       {
         "name": "Paul Puppy",
         "profilePic": "assets/img/speakers/puppy.jpg",
         "subItems": [
           {
             "name": "Sub item 1",
             "quantity": 3
           },
           {
             "name": "Sub item 2",
             "quantity": 3
           }
         ]
       }
     ];

     for(let item of items) {
       this.items.push(new Item(item));
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
