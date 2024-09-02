const models = require("../users/users.model");
const model = require("./chat.model");

const userModel = models.user;
const chatModel = model.chat;

exports.viewusers = async (req, res) => {
  const users = await userModel.find({ usertype: 0 }).populate("userid");
  res.json(users);
};

exports.sendmessage = async (req, res) => {
  const data = {
    message: req.body.message,
    senderid: req.body.senderid,
    recieverid: req.body.recieverid,
  };
  const chat = await chatModel.create(data);
  res.json(chat);
};

exports.getmessage = async (req, res) => {
  try {
    const senderId = req.body.senderid;
    const chat = await chatModel
      .find({
        $or: [{ senderid: senderId }, { recieverid: senderId }],
      })
      .populate({
        path: "senderid recieverid",
        populate: {
          path: "userid",
          model: "userdetail",
        },
      });

    console.log(chat);
    res.json(chat);
  } catch (error) {
    console.error("error detected", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletemessage = async (req, res) => {
  try {
    const deletemessage = await chatModel.findByIdAndDelete(req.body.id);
    res.json("deleted message");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};
