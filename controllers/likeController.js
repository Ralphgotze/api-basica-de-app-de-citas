const db = require('../database/conexion.js')

class likeController{
    constructor(){

    }

    darLike(req, res){
        try {
            const {usuario_id, liked_usuario_id} = req.body
            db.query(`INSERT INTO likes 
                (usuario_id, liked_usuario_id)
                VALUES(?, ?);`,
        [usuario_id, liked_usuario_id], (err, result) => {
            if (err) {
                res.status(400).send(err.message);
            }
            if (result){
                // res.status(201).json({ id: rows.insertId });
                return res.send(JSON.stringify(result));
            }
        });
        } catch (err) {
            res.status(500).send(err.message)
        }
    }



    invite(req, res){
        try {
            const { usuario_id } = req.query
            db.query(`SELECT usuario.id, usuario.nombre FROM usuario
            WHERE usuario.id NOT IN (
            SELECT liked_usuario_id FROM likes WHERE usuario_id = ?
            );
            `,[usuario_id], (err, result) =>{
                    if (err) {
                        return res.status(400).send(err.message);
                    }
                    if (result){
                        // return res.jyson({ usuario_id:usuario_id, mensaje:mensaje});
                        return res.status(200).send(JSON.stringify(result))
                    }
                })

        } catch (err) {
            return res.status(501).send(err.message)
        }
    }
    friends(req, res){
        try {
            const { usuario_id, liked_usuario_id } = req.query
            db.query(`SELECT l1.liked_usuario_id AS id, 
            u1.nombre AS user_nombre
            FROM likes l1
            JOIN usuario u1 ON l1.liked_usuario_id = u1.id
            WHERE l1.usuario_id = ?
            UNION
            SELECT l2.usuario_id AS usuario_id, 
            u2.nombre AS nombre
            FROM likes l2
            JOIN usuario u2 ON l2.usuario_id = u2.id
            WHERE l2.liked_usuario_id = ?;

            `,[usuario_id, usuario_id], (err, result) =>{
                    if (err) {
                        return res.status(400).send(err.message);
                    }
                    if (result){
                        // return res.jyson({ usuario_id:usuario_id, mensaje:mensaje});
                        return res.status(200).send(JSON.stringify(result))
                    }
                })

        } catch (err) {
            return res.status(501).send(err.message)
        }
    }
}



module.exports = new likeController