const mongoose = require("mongoose");

const friendSchema = mongoose.Schema({
  following: {type: mongoose.Schema.Types.ObjectId,required: true,ref: "user"},
  follower: { type: mongoose.Schema.Types.ObjectId,required: true, ref: "user" },
  createdAt: { type: Date, default: Date.now },
});

const friend = mongoose.model("friend", friendSchema);

module.exports = { friend };
