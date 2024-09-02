    const express = require("express");
    const router = express.Router();

    const postController = require("./post.controller");

    router.post("/post", postController.post);
    router.get("/viewpost", postController.viewpost);
    router.post("/addcomment", postController.addcomment);
    router.post("/like", postController.likePost);
    router.post("/dislike", postController.unlikePost);
    router.post("/deletepost", postController.deletepost);
    router.post("/getpostdetail", postController.getpostdetail);
    router.post("/updatepost", postController.updatePost);
    router.post("/reportpost", postController.reportpost);
    router.post("/user", postController.users);
    router.post("/updateprofile", postController.updateprofile);

    module.exports = router;
