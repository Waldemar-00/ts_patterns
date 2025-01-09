abstract class DeliveryItem
{
    items: DeliveryItem[] = []

    addItem ( item: DeliveryItem ): void
    {
        this.items.push( item )
    }
    getAllPrices (): number
    {
        return this.items.reduce( ( acc: number, item: DeliveryItem ) =>
        {
            return acc + item.getPrice()
        }, 0)
    }
    abstract getPrice(): number
}

class DeliveryShop extends DeliveryItem
{
    constructor (public deliveryFee: number)
    {
        super()
    }
    getPrice (): number
    {
        return this.getAllPrices() + this.deliveryFee
    }
}

class Package extends DeliveryItem
{
    constructor() { super() }
    getPrice (): number
    {
        return this.getAllPrices()
    }
}

class Product extends DeliveryItem
{
    constructor ( public price: number ) { super() }
    getPrice (): number
    {
        return this.price
    }
}

const shop = new DeliveryShop( 10 )
shop.addItem( new Product( 2200 ) )

const package_1 = new Package()
package_1.addItem( new Product( 200 ) )
package_1.addItem( new Product( 34 ) )

shop.addItem( package_1 )

const package_2 = new Package()
package_2.addItem( new Product( 11 ) )
shop.addItem( package_2 )

console.log( shop.items )
