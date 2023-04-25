'use strict';

const db = require('../config/db.conn')
class UserStorage {
    static getUserinfo(id) {
        return new Promise((resolve,reject)=>{
            const query = "SELECT * FROM info_user WHERE id = ?"
            const execSql = db.query(query,[id],(err,data) => {
                if(err) reject(`${err}`)
                resolve(data[0]);
            })
            console.log(execSql.sql)
        })
    }
}

module.exports = UserStorage;