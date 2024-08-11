import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Item } from "../models/item.model";

@Injectable({ providedIn: 'root' })
export class ItemsService {
    itemsChanged = new Subject<Item[]>();

    private items: Item[] = [
        new Item(
            1111,
            'Tagliere del fattore',
            'Selezione di salumi e formaggi, giardiniera artigianale, confetture.',
            15.90,
            'https://www.fattoincasadabenedetta.it/wp-content/uploads/2022/12/IDEA_DI_TAGLIERE_DI_SALUMI_E_FORMAGGI_PER_MILLE_OCCASIONI_SITO-4.jpg',
            ['nota 1', 'nota 2']
        ),
        new Item(
            2222,
            'Garganelli al ragù romagnolo',
            'Pasta all\'uovo tipica della romagna conditi con un delizioso sugo a base di carne.',
            8.50,
            'https://www.cirio.it/repository/ricettario/garganelli-al-ragas-di-anatra.jpg',
            ['Contiene glutine', 'nota test']
        ),
        new Item(
            3333,
            'Tortellini in brodo',
            'Pasta all\'uovo con ripieno di carne.',
            13,
            'https://images.prismic.io/eataly-bbb/19d60457-1823-47a3-898a-edbda42ec9e7_tortellini-brodo.jpg?auto=compress,format',
            ['note']
        )
    ];

    constructor() {
        localStorage.setItem('items-menu', JSON.stringify(this.items));
    }

    getItems() {
        return this.items.slice();
    }

    getItemById(id: number) {
        return this.items.find(el => el.id === id);
    }

    saveItem(id: number, itemInfo: Item) {
        const item = this.items.find(el => el.id === id);
        if (item) {
            item.name = itemInfo.name;
            item.description = itemInfo.description;
            item.price = itemInfo.price;
            item.picture = itemInfo.picture;
            item.notes = itemInfo.notes.toString().split(',');
            // update items list
            localStorage.setItem('items-menu', JSON.stringify(this.items));
            this.itemsChanged.next(this.items);
        }
    }

    generateId(): any {
        let val = Math.floor(1000 + Math.random() * 9000);
        let idAlreadyExists = this.items.find(el => el.id === val);
        if (idAlreadyExists) {
            console.log('id already exists');
            this.generateId();
        } else {
            return val;
        }
    }

    addItem(itemInfo: Item) {
        const item = new Item(
            itemInfo.id,
            itemInfo.name,
            itemInfo.description,
            itemInfo.price,
            itemInfo.picture,
            itemInfo.notes.toString().split(',')
        )
        this.items.push(item);
        // update items list
        localStorage.setItem('items-menu', JSON.stringify(this.items));
        this.itemsChanged.next(this.items);
    }

    removeItem(id: number) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
        // update items list
        localStorage.setItem('items-menu', JSON.stringify(this.items));
        this.itemsChanged.next(this.items);
    }
}