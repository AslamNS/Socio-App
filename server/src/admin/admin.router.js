const express = require("express");
const router = express.Router();

const adminController = require("./admin.controller");

router.get("/viewreportedpost", adminController.viewreportedpost);
router.post("/blockuser", adminController.blockuser);
router.post("/profile", adminController.profile);
router.post("/post", adminController.post);
router.get("/viewcommunity", adminController.viewcommunity);
router.post("/approvecommunity", adminController.approvecommunity);

module.exports = router;
