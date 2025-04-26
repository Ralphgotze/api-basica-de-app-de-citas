const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host:'127.0.0.1',
        user:'root',
        password:"root",
        database:"usuarios"
    }
)

db.connect((err) => {
    if(err){
        throw err
    }
    console.log("conectado papi")
})

module.exports = db