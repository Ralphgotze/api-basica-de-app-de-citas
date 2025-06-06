const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: 'mysql.railway.internal',
        user: 'root',
        password: 'euiGRTaOeMpqXkMFLXmBuKdUYJESnVUY',
        database: 'railway',
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
