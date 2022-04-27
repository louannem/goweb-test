export class Product {
    constructor(object, newPrice) {
        this.id = object.id;
        this.title = object.title;
        this.image = object.image;
        this.description = object.description;
        this.category = object.category;
        this.price = newPrice;
        this.priceWithVAT = newPrice + newPrice * 0.2 
    }
}