"use strict";
class DeliveryItem {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    getAllPrices() {
        return this.items.reduce((acc, item) => {
            return acc + item.getPrice();
        }, 0);
    }
}
class DeliveryShop extends DeliveryItem {
    constructor(deliveryFee) {
        super();
        this.deliveryFee = deliveryFee;
    }
    getPrice() {
        return this.getAllPrices() + this.deliveryFee;
    }
}
class Package extends DeliveryItem {
    constructor() { super(); }
    getPrice() {
        return this.getAllPrices();
    }
}
class Product extends DeliveryItem {
    constructor(price) {
        super();
        this.price = price;
    }
    getPrice() {
        return this.price;
    }
}
const shop = new DeliveryShop(10);
shop.addItem(new Product(2200));
const package_1 = new Package();
package_1.addItem(new Product(200));
package_1.addItem(new Product(34));
shop.addItem(package_1);
const package_2 = new Package();
package_2.addItem(new Product(11));
shop.addItem(package_2);
console.log(shop.items);
