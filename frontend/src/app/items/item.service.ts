import { Injectable } from "@angular/core";
import { Item } from "./item.model";

@Injectable()
export class ItemService {

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
            item.picture = itemInfo.picture;
            item.name = itemInfo.name;
            item.description = itemInfo.description;
            item.price = itemInfo.price;
            item.notes = itemInfo.notes.toString().split(',');
        }
    }

    addItem(item: Item) {
        console.log(item);
    }
}