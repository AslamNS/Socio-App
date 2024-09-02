const express = require('express')
const router=express.Router()

const chatController = require('./chat.controller')

router.get('/viewusers',chatController.viewusers)
router.post('/sendmessage',chatController.sendmessage)
 router.post('/getmessage',chatController.getmessage)
 router.post('/deletemessage',chatController.deletemessage)




module.exports=router