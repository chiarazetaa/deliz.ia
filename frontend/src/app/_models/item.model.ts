export class Item {
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public picture: string;
    public notes: string[];

    constructor(id: number, name: string, description: string, price: number, picture: string, notes: string[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.picture = picture;
        this.notes = notes;
    }
}