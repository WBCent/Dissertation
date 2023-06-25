// https://www.sqlitetutorial.net/sqlite-nodejs/connect/

import sqlite3 from 'sqlite3';

let db = new sqlite3.Database('./Database/db.sqlite', (err) => {
        if(err) {
            console.error(err.message);
        } else {
            console.log('Connected to the database')
        }
    })



export default db;