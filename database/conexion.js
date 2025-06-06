const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'usuarios',
        port: 3306
    }
)

db.connect((err) => {
    if(err){
        throw err
    }
    console.log("conectado papi")
})

module.exports = db