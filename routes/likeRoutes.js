const express = require('express')
const router = express.Router()
const likeController = require('../controllers/likeController')

router.post('/send', likeController.darLike)
router.get('/invite', likeController.invite)
router.get('/friends', likeController.friends)

module.exports = router