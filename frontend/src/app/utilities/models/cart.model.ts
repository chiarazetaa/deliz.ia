import { Item } from "./item.model";

export class Cart {
    public item: Item;
    public quantity: number;

    constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }
}