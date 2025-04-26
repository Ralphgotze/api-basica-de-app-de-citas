const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController.js')

router.post('/register', usuarioController.register)
router.post('/login', usuarioController.login)
router.get('/profile/:id', usuarioController.profile)
router.put('/edit/:id', usuarioController.edit)
router.post('/logout', usuarioController.logout)
router.delete('/delete', usuarioController.delete)

module.exports = router