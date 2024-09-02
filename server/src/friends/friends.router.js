const express = require("express");
const router = express.Router();

const friendController = require("./friends.controller");

router.get('/users' ,friendController.viewusers)
router.post('/follow' ,friendController.follow)
router.post('/friends' ,friendController.friends)
router.post('/unfollow' ,friendController.unfollow)

module.exports = router;