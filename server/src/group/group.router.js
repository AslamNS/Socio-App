const express = require('express')
const router=express.Router()

const groupController = require('./group.controller')

router.get('/showusers',groupController.showusers)
router.post('/create',groupController.create)
router.post('/viewgroup',groupController.viewgroup)
router.post('/sendmessage',groupController.sendmessage)
router.post('/viewmessage',groupController.viewmessage)
router.post('/dltgrpmsg',groupController.deletegroupchatmsg)
router.get('/viewusers',groupController.viewusers)
router.post("/adduser", groupController.addUserToGroup);

module.exports=router