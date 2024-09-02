const express = require('express')
const router=express.Router()

const communityController = require('./community.controller')

router.post('/create',communityController.create)
router.post('/viewcommunity',communityController.viewcommunity)
router.post('/viewallcommunity',communityController.viewallcommunity)
router.post('/sendmessage',communityController.sendmessage)
router.post('/viewmessage',communityController.viewmessage)
router.post('/join',communityController.join)
router.post('/report',communityController.report)
router.get('/reportedcontent',communityController.reportedcontent)
router.post('/deletechat',communityController.deletechat)
// router.post('/dltgrpmsg',groupController.deletegroupchatmsg)
// router.get('/viewusers',groupController.viewusers)
// router.post("/adduser", groupController.addUserToGroup);

module.exports=router