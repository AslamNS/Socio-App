const models = require("../community/community.model");

const communityModel = models.community;
const communitychatModel = models.communitychat;

exports.create = async (req, res) => {
  try {
    const data = {
      admin: req.body.admin,
      communityname: req.body.name,
      members: req.body.members,
      image: req.body.image,
    };
    await communityModel.create(data);
    res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create group", error });
  }
};

exports.viewcommunity = async (req, res) => {
  try {
    const userId = req.body.auth;

    const groups = await communityModel.find({
      $or: [{ admin: userId }, { members: userId }],
    });
    res.json(groups);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the groups." });
  }
};
exports.viewallcommunity = async (req, res) => {
  try {
    const groups = await communityModel.find(
      { members: { $ne: req.body.id } } && { status: 1 }
    );
    res.json(groups);
  } catch (error) {
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
    image: req.body.image,
  };
  await communitychatModel.create(data);
  res.json("success");
};

exports.viewmessage = async (req, res) => {
  try {
    const groupId = req.body.groupid;
    const groupchat = await communitychatModel
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

exports.join = async (req, res) => {
  try {
    const community = await communityModel.findOne({
      _id: req.body.id,
      members: req.body.userid,
    });

    if (community) {
      return res.json({ message: "Already joined" });
    }

    await communityModel.findByIdAndUpdate(req.body.id, {
      $push: { members: req.body.userid },
    });

    res.json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.report = async (req, res) => {
  await communitychatModel.findByIdAndUpdate(req.body.id, {
    status: 1,
  });
  res.json({ message: "success" });
};

exports.reportedcontent = async (req, res) => {
  try {
    const reportedcontent = await communitychatModel.find({ status: 1 });
    res.json(reportedcontent);
  } catch (error) {
    console.error("error detected", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletechat = async (req, res) => {
  await communitychatModel.findByIdAndDelete(req.body.id);
  res.json({ message: "success" });
};
