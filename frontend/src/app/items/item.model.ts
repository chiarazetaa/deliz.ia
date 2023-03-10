export class Item {
    public name: string;
    public description: string;
    public price: number;
    public picture: string;
    public notes: string[];

    constructor(name: string, description: string, price: number, picture: string, notes: string[]) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.picture = picture;
        this.notes = notes;
    }
}