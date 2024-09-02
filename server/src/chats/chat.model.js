const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    senderid: { type: String, required: true,ref:'user' },
    recieverid: { type: String, required: true,ref:'user' },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now()}
  });
  const chat = mongoose.model("chat", chatSchema);
module.exports = {chat}
