import Dexie from 'dexie';

const db = new Dexie('productsBarato');
db.version(1).stores({
    productsdb: '++id, name, price, description, type, img'
});

export default db;


export const productsdb = db.table('productsdb');