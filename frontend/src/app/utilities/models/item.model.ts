export class Item {
    public _id: string;
    public name: string;
    public description: string;
    public price: number;
    public picture: string;
    public notes: string[];

    constructor(_id: string, name: string, description: string, price: number, picture: string, notes: string[]) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.picture = picture;
        this.notes = notes;
    }
}