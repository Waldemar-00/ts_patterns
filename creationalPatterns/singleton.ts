class Singleton
{
    static #instance: Singleton //! private

    dmap: Map<number, string> = new Map()

    private constructor() {} //! NO - new Singleton()
    public static getInstance (): Singleton
    {
        if ( !Singleton.#instance )
        {
            console.log('Created Instance')
            Singleton.#instance = new Singleton()
        }
        return Singleton.#instance
    }
}

const myMap = Singleton.getInstance().dmap.set( 1, 'Singleton instance' )
console.log( myMap )

class Service_1
{
    addToSingletonMap (key: number, value: string): void
    {
        Singleton.getInstance().dmap.set(key, value)
    }
}

class Service_2
{
    getByKeyFromSingletonMap ( key: number ): void
    {
        console.log( Singleton.getInstance().dmap.get( key ) )
    }
}

new Service_1().addToSingletonMap( 0, "Singleton is working" )
new Service_2().getByKeyFromSingletonMap( 1 )
new Service_2().getByKeyFromSingletonMap( 0 ) //! The same Map!
