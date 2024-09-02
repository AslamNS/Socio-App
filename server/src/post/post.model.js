const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  image: { type: String, required: true },
  description: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  comments: [
    {
      comment: { type: String, required: true },
      userid: { type: mongoose.Schema.Types.ObjectId, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  status: { type: String, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const post = mongoose.model("post", postSchema);

module.exports = { post };
