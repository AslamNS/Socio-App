const models = require("../users/users.model");
const model = require("./group.model");
const mongoose = require('mongoose');

const userModel = models.user;
const groupModel = model.group;
const groupchatModel = model.groupchat;

exports.showusers = async (req, res) => {
  const users = await userModel.find({usertype:0}).populate("userid");
  res.json(users);
};

exports.create = async (req, res) => {
  try {
    const data = {
      admin: req.body.admin,
      groupname: req.body.groupname,
      members: req.body.members,
      image: req.body.image,
    };
    await groupModel.create(data);
    res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create group", error });
  }
};

exports.viewgroup = async (req, res) => {
  try {
    // Assuming req.body.auth contains the user ID
    const userId = req.body.auth;

    // Fetch groups where the user is either an admin or a member
    const groups = await groupModel.find({
      $or: [{ admin: userId }, { members: userId }],
    });

    // Respond with the fetched groups
    res.json(groups);
  } catch (error) {
    // Handle any errors that occur during the database query
    res
      .status(500)
      .json({ error: "An error occurred while fetching the groups." });
  }
};

exports.sendmessage = async (req, res) => {
  const data = {
    senderid: req.body.senderid,
    groupid: req.body.groupid,
    message: req.body.message,
  };
  await groupchatModel.create(data);
  res.json("success");
};

// exports.viewmessage = async (req, res) => {
//     const senderId = req.body.senderid;
//     // console.log(senderId)
//   const group = await groupchatModel.find({
//     $or: [{ senderid: senderId }, { groupid: senderId }].populate(["senderid","groupid"])
//   });
//   res.json(group);
// };

// exports.viewmessage = async (req, res) => {
//     try {
//       const senderId = req.body.senderid;
//       const groupchat = await groupchatModel
//         .find({
//           $or: [{ senderid: senderId }, { groupid: senderId }],
//         })
//         .populate(["senderid", "groupid"]);
//       console.log(groupchat);
//       res.json(groupchat);
//     } catch (error) {
//       console.error("error detected", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };

exports.viewmessage = async (req, res) => {
  try {
    const groupId = req.body.groupid;
    const groupchat = await groupchatModel
      .find({
        groupid: groupId,
      })
      .populate({
        path: "senderid",
        populate: {
          path: "userid",
          model: "userdetail",
        },
      });
    console.log(groupchat);
    res.json(groupchat);
  } catch (error) {
    console.error("error detected", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletegroupchatmsg = async (req, res) => {
  try {
    await groupchatModel.findByIdAndDelete(req.body.id);
    res.json("deleted message");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

exports.viewusers = async (req, res) => {
  const users = await userModel.find({usertype : 0}).populate({
    path: "userid",
    model: "userdetail",
  });
  res.json(users);
};

exports.addUserToGroup = async (req, res) => {
  try {
    const userId = (req.body.userId);
    const groupId = (req.body.groupId);
    const updatedGroup = await groupModel.findByIdAndUpdate(
      groupId,
      { $push: { members: userId } },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
