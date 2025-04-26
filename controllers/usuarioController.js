const db = require('../database/conexion.js')

class usuarioController {
    constructor(){

    }

    register(req, res){
        try {
            const {nombre, contraseña, is_login} = req.body
            db.query(`INSERT INTO usuario
                (id, nombre, contraseña, is_login)
                VALUES(NULL, ?, ?, ?);`,
        [nombre, contraseña, is_login], (err, result) => {
            if (err) {
                res.status(400).send(err.message);
            }
            if (result.insertId){
                // res.status(201).json({ id: rows.insertId });
                return res.json({ id: result.insertId , nombre:nombre, is_login:is_login});
            }
        });
        } catch (errr) {
            res.status(500).send(errr.message)
        }
    }
    login(req, res){
        try {
            const {nombre, contraseña} = req.body
            db.query("SELECT * FROM usuario WHERE nombre = ? AND contraseña = ?",
                [nombre, contraseña], (err, result) => {
                    if (err) {
                        return res.status(400).send(err);
                    }
                    if (result.length > 0){
                        const usuarioId = result[0].id
                        db.query("UPDATE usuario SET is_login = 1 WHERE id = ?", [usuarioId], (err, result) => {
                            if (err) {
                               return res.status(400).send(err);
                            }
                            if(result){
                                console.log("se cambio")
                                return res.json({ id: usuarioId , nombre:nombre});
                            }
                        })
                    }
            });
        } catch (errr) {
            return res.status(500).send(errr.message)
        }
    }
    profile(req, res){
        const usuarioId = req.params.id;

        db.query("SELECT nombre, is_login FROM usuario WHERE id = ?", [usuarioId], (err, result) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });

        if (result.length > 0) {
            return res.json({ nombre: result[0].nombre, is_login: result[0].is_login }); // ✅ Enviar JSON correctamente
        } else {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
    });
    }
    edit(req, res) {
        const usuarioId = req.params.id; // 🌍 Solo el ID viene de los parámetros de la URL
        const { nombre, contraseña } = req.body; // ✅ Los datos editados vienen del cuerpo (body)
    
        db.query("UPDATE usuario SET nombre = ?, contraseña = ? WHERE id = ?", 
            [nombre, contraseña, usuarioId], (err, result) => {
            if (err) {
                console.error("Error en SQL:", err); // 🔥 Log para ver el error en la consola
                return res.status(500).json({ error: "Error en el servidor" });
            }
    
            if (result.affectedRows > 0) {
                return res.json({ mensaje: "Usuario actualizado correctamente", nombre:nombre }); // ✅ Confirmación de éxito
            } else {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
        });
    }
    logout(req, res){
        res.send("resgistrar")
    }
    delete(req, res){
        res.send('registrar')
    }
}

module.exports = new usuarioController