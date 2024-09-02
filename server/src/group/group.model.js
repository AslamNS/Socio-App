const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    members: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }],
    groupname: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const group = mongoose.model("group", groupSchema);


const groupchatSchema = mongoose.Schema({
  senderid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
  groupid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'group' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const groupchat = mongoose.model("groupchat", groupchatSchema);

module.exports = { group , groupchat };
