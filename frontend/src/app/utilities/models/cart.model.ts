import { Item } from "./item.model";

export class Cart {
    public _id: string;
    public list: [];
    

    constructor(_id: string, list: []) {
        this._id = _id;
        this.list = list;
    }
}