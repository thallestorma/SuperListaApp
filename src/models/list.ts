import { Item } from './item';

export class List {

  constructor(public id: string, public nome: string, public items: Item[]) {

  }

  addItem(item: Item) {
    this.items.push(item);
  }

}
