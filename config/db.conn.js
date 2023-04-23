const mysql = require('mysql');
const connection = mysql.createConnection(
    {
        host : "localhost",
        port : "3306",
        user : "root",
        password : "0000",
        database : "db_academic"
    
    }
)

connection.connect()

module.exports = connection