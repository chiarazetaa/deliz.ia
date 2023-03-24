import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Item } from "./item.model";

@Injectable()
export class ItemService {

    itemsChanged = new Subject<Item[]>();

    private items: Item[] = [
        new Item(
            'Tagliere del fattore',
            'Selezione di salumi e formaggi, giardiniera artigianale, confetture.',
            15,
            'https://www.fattoincasadabenedetta.it/wp-content/uploads/2022/12/IDEA_DI_TAGLIERE_DI_SALUMI_E_FORMAGGI_PER_MILLE_OCCASIONI_SITO-4.jpg',
            ['nota 1', 'nota 2']
        ),
        new Item(
            'Garganelli al ragù romagnolo',
            'Pasta all\'uovo tipica della romagna conditi con un delizioso sugo a base di carne.',
            8,
            'https://www.cirio.it/repository/ricettario/garganelli-al-ragas-di-anatra.jpg',
            ['Contiene glutine', 'nota test']
        ),
        new Item(
            'Tortellini in brodo',
            'Pasta all\'uovo con ripieno di carne.',
            13,
            'https://images.prismic.io/eataly-bbb/19d60457-1823-47a3-898a-edbda42ec9e7_tortellini-brodo.jpg?auto=compress,format',
            ['note']
        )
    ];

    constructor() {}

    getItems() {
        return this.items.slice();
    }

    getItem(index: number) {
        return this.items[index];
    }

    saveItem(index: number, itemInfo: Item) {
        const item = this.items[index];
        if (item) {
            item.name = itemInfo.name;
            item.description = itemInfo.description;
            item.price = itemInfo.price;
            item.picture = itemInfo.picture;
            item.notes = itemInfo.notes.toString().split(',');
        }
    }

    addItem(itemInfo: Item) {
        const item = new Item(
            itemInfo.name,
            itemInfo.description,
            itemInfo.price,
            itemInfo.picture,
            itemInfo.notes.toString().split(',')
        )
        this.items.push(item);
        this.itemsChanged.next(this.items.slice());
    }

    removeItem(index: number) {
        this.items.splice(index, 1);
        this.itemsChanged.next(this.items.slice());
    }
}