import { Item } from "./item.model";

export class CartItem {
    public item: Item;
    public quantity: number;

    constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }
}