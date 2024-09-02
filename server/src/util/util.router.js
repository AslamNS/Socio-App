const express = require("express");
const router = express.Router();

const utilController = require('./util.controller')

 router.post('/fileUpload',utilController.fileUpload) 


module.exports=router