const mongoose = require("mongoose");

const userdetailSchema = mongoose.Schema({
    name:      { type: String, required: false },
    dob:       { type: String, required: false },
    gender:    { type: String, required: false },
    image:     { type: String, contentType: String},
    idproof:   { type: String, contentType: String},
    createdAt: { type: Date, default: Date.now()}
  });       
  const userdetail = mongoose.model("userdetail", userdetailSchema);

const userSchema = mongoose.Schema({
    email:     { type: String, required: true },
    password:  { type: String, required: true },
    usertype:  { type: String, required: true },
    userid:    { type: mongoose.Schema.Types.ObjectId, ref: "userdetail"},
    createdAt: { type: Date, default: Date.now()}
  });       
  const user = mongoose.model("user", userSchema);

module.exports = {user,userdetail}

