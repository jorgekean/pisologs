import Dexie from 'dexie';

const db = new Dexie('expenseTrackerDB');

db.version(1).stores({
    transactions: '++id,transactionDate,description,amount,quantity',
});

export default db;
