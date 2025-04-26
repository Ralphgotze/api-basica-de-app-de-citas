const db = require('../database/conexion.js')

class chatController{
    constructor(){

    }
    chat(req, res){
        try {
            const usuario_receiver_id = req.params.id
            const {usuario_id, mensaje} = req.body
            db.query(`INSERT INTO mensajes 
                (usuario_sender_id, usuario_receiver_id, mensaje) 
                VALUES (?, ?, ?);`,
        [usuario_id, usuario_receiver_id, mensaje], (err, result) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            if (result){
                // res.status(201).json({ id: rows.insertId });
                return res.json({ usuario_id:usuario_id, usuario_receiver_id:usuario_receiver_id,mensaje:mensaje});
            }
        });
        } catch (errr) {
            return res.status(500).send(errr.message)
        }
    }
    getChat(req, res){
        try {
            const usuario_receiver_id = req.query.receiver_id
            const usuario_id = req.query.id
            db.query(`SELECT m.*, 
            u1.nombre nombre_sender, 
            u2.nombre nombre_receiver
            FROM mensajes m
            JOIN usuario u1 ON m.usuario_sender_id = u1.id
            JOIN usuario u2 ON m.usuario_receiver_id = u2.id
            WHERE (m.usuario_sender_id = ? AND m.usuario_receiver_id = ?)
            OR (m.usuario_sender_id = ? AND m.usuario_receiver_id = ?)
            ORDER BY m.fecha DESC;`,[usuario_id, usuario_receiver_id, usuario_receiver_id, usuario_id] , (err, result) =>{
                    if (err) {
                        return res.status(400).send(err.message);
                    }
                    if (result){
                        // return res.json({ usuario_id:usuario_id, mensaje:mensaje});
                        return res.status(200).send(JSON.stringify(result))
                    }
                })
    
        } catch (err) {
            return res.status(501).send(err.message)
        }
    }    
    
}

module.exports = new chatController