"use strict";
class KVDatabase {
    constructor() {
        this.DB = new Map();
    }
    save(key, value) {
        this.DB.set(key, value);
        console.log('I am working! KVDatabase!');
    }
}
class PersistentDatabase {
    savePersistent(data) {
        this.db = data;
        console.log(this.db, "PersistentDatabase, Object");
    }
}
class Adapter extends KVDatabase {
    constructor(persistenDdatabase) {
        super();
        this.persistenDdatabase = persistenDdatabase;
    }
    save(key, value) {
        this.persistenDdatabase.savePersistent({ key, value });
    }
}
const adapter = new Adapter(new PersistentDatabase());
adapter.save('some key', 'some value');
function run(base) {
    base.save('key', 'value');
}
run(new Adapter(new PersistentDatabase()));
