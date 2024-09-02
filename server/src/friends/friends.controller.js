const model = require("../users/users.model");
const friendmodel = require("./friends.model");

const userModel = model.user;
const userdetailModel = model.userdetail;
const friendModel = friendmodel.friend;

exports.viewusers = async (req, res) => {
  try {
    const userId = req.body.Userid;
    const viewuser = await userModel.find({usertype:0}).populate("userid");
    res.json(viewuser);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
// exports.viewusers = async (req, res) => {
//   try {
//     const userId = req.body.Userid;
//     const viewuser = await userModel.find().populate("userid");
//     res.json(viewuser);
//   } catch (error) {
//     res.status(500).json({ message: "internal server error" });
//   }
// };

exports.follow = async (req, res) => {

  const follow = await friendModel.findOne({
    follower: req.body.follower,
    following: req.body.following,
  });
  if (follow) {
    return res.json("Your are already following this user");
  }

  const data = {
    follower: req.body.follower,
    following: req.body.following,
  };
  await friendModel.create(data);
  res.json("following sucessfully");
};

exports.friends = async (req, res) => {
  try {
    const userId = req.body.Userid;
    const viewfriend = await friendModel
      .find({ following: userId })
      .populate({
        path: "follower",
        populate: {
          path: "userid",
          model: "userdetail",
        },
      })
      .exec();

    res.json(viewfriend);
  } catch (error) {
    console.error("Error in friends controller:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.unfollow = async (req, res) => {
  try {
    await friendModel.findByIdAndDelete(req.body.id);
    res.json("unfollowed");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};
