class KVDatabase
{
    private DB: Map<string, string> = new Map()
    save ( key: string, value: string )
    {
        this.DB.set( key, value )
        console.log('I am working! KVDatabase!')
    }
}

class PersistentDatabase
{
    db!: Object
    savePersistent ( data: Object )
    {
        this.db = data
        console.log(this.db, "PersistentDatabase, Object")
    }
}

class Adapter extends KVDatabase
{
    constructor (public persistenDdatabase: PersistentDatabase)
    {
        super()
    }
    override save ( key: string, value: string )
    {
        this.persistenDdatabase.savePersistent( { key, value } )
    }
}

const adapter = new Adapter(new PersistentDatabase())

adapter.save( 'some key', 'some value' )


function run ( base: KVDatabase )
{
    base.save('key', 'value')
}

run(new Adapter(new PersistentDatabase()))