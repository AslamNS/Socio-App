const mongoose = require("mongoose");

const communitySchema = mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    members: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }],
    communityname: { type: String, required: true },
    status: { type: Number, required: true , default: 0},
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const community = mongoose.model("community", communitySchema);

const communitychatSchema = mongoose.Schema({
    senderid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    groupid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'community' },
    message: { type: String, required: false , default: null},
    image: { type: String, required: false },
    status: { type: String, default: 0 },
    createdAt: { type: Date, default: Date.now }
  });
  const communitychat = mongoose.model("communitychat", communitychatSchema);

module.exports = { community , communitychat  }; 