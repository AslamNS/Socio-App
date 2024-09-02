const express = require("express");
const db = require("./db");

var bodyParser = require("body-parser");
var cors = require("cors");
const session = require("express-session");
const fileUpload = require("express-fileupload");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(fileUpload());
app.use("/uploads", express.static("src/uploads"));

app.use(bodyParser.json());
const port = 4000;
const chatRouter = require("./src/chats/chat.router");
const userRouter = require("./src/users/users.router");
const postRouter = require("./src/post/post.router");
const groupRouter = require("./src/group/group.router");
const communityRouter = require("./src/community/community.router");
const utilRouter = require("./src/util/util.router");
const friendRouter = require("./src/friends/friends.router");
const adminRouter = require("./src/admin/admin.router");
db();
app.get("/", (req, res) => {
  res.send("loaded");
});
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/post", postRouter);
app.use("/group", groupRouter);
app.use("/community", communityRouter);
app.use("/util", utilRouter);
app.use("/friend", friendRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log("Server is running");
});
