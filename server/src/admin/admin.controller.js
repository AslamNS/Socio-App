const models = require("../post/post.model");
const model = require("../users/users.model");
const cmodel = require("../community/community.model");

const postModel = models.post;
const userModel = model.user;
const communityModel = cmodel.community;

exports.viewreportedpost = async (req, res) => {
  try {
    const viewpost = await postModel
      .find({ status: 1 })
      .populate({
        path: "userid",
        model: "user",
        populate: {
          path: "userid",
          model: "userdetail",
        },
      })
      .populate({
        path: "comments.userid",
        model: "user",
        populate: {
          path: "userid",
          model: "userdetail",
        },
      })
      .populate({
        path: "likes",
        model: "user",
        populate: {
          path: "userid",
          model: "userdetail",
        },
      });
    res.json(viewpost);
  } catch (error) {
    console.error("Error in viewpost controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.blockuser = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.body.id, { usertype: 2 });
    res.status(200).json("User Blocked Sucessfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

exports.profile = async (req, res) => {
  try {
    const profile = await userModel.findById(req.body.id).populate({
      path: "userid",
      model: "userdetail",
    });
    res.json(profile);
  } catch (error) {
    console.error("Error in profile controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.post = async (req, res) => {
  try {
    const post = await postModel.find({ userid: req.body.id });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.viewcommunity = async (req, res) => {
  try {
    const viewcommunity = await communityModel.find({ status: 0 });
    res.json(viewcommunity);
  } catch (error) {
    console.error("Error in viewcommunity controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.approvecommunity = async (req, res) => {
  try {
    await communityModel.findByIdAndUpdate(req.body.id, { status: 1 });
    res.status(200).json("Community Approved Sucessfully");
  } catch (error) {
    console.error("Error approving community:", error);
    res.status(500).json({ error: "Error approving community" });
  }
};

// exports.addgovt = async (req, res) => {
//   try {
//     let param = {
//       userid: req.body.userid,
//       image: req.body.image,
//       description: req.body.description,
//     };
//     await userModel.create(param);
//     res.json("success");
//   } catch (error) {
//     console.error("Error in addgovt controller:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }