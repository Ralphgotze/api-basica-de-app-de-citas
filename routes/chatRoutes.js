const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')


// router.get('/friends', chatController.getChat)
router.get('', chatController.getChat)
router.post('/:id', chatController.chat)
// router.get('/users', chatController.getUsers)

module.exports = router