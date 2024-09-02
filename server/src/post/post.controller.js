const mongoose = require("mongoose");
const models = require("./post.model");
const model = require("../users/users.model");

const userModel = model.user;
const userdetailModel = model.userdetail;

const postModel = models.post;

exports.post = async (req, res) => {
  try {
    let param = {
      userid: req.body.userid,
      image: req.body.image,
      description: req.body.description,
    };
    await postModel.create(param);
    res.json("success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.viewpost = async (req, res) => {
  try {
    const viewpost = await postModel
      .find()
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
      }).sort({ createdAt: -1 });

    const processedPosts = viewpost.map((post) => ({
      _id: post._id,
      userid: post.userid
        ? {
            _id: post.userid._id,
            email: post.userid.email,
            usertype: post.userid.usertype,
            name: post.userid.userid.name, // Access the name from userdetail
            dob: post.userid.userid.dob,
            gender: post.userid.userid.gender,
            image: post.userid.userid.image,
            createdAt: post.userid.createdAt,
          }
        : null,
      image: post.image,
      description: post.description,
      likes: post.likes.map((like) =>
        like
          ? {
              _id: like._id,
              email: like.email,
              usertype: like.usertype,
              name: like.userid ? like.userid.name : null, // Access the name from userdetail
              dob: like.userid ? like.userid.dob : null,
              gender: like.userid ? like.userid.gender : null,
              image: like.userid ? like.userid.image : null,
              createdAt: like.createdAt,
            }
          : null
      ),
      comments: post.comments.map((comment) => ({
        _id: comment._id,
        comment: comment.comment,
        userid: comment.userid
          ? {
              _id: comment.userid._id,
              email: comment.userid.email,
              usertype: comment.userid.usertype,
              name: comment.userid.userid ? comment.userid.userid.name : null, // Access the name from userdetail
              dob: comment.userid.userid ? comment.userid.userid.dob : null,
              gender: comment.userid.userid
                ? comment.userid.userid.gender
                : null,
              image: comment.userid.userid ? comment.userid.userid.image : null,
              createdAt: comment.userid.createdAt,
            }
          : null,
        createdAt: comment.createdAt,
      })),
      createdAt: post.createdAt,
    }));

    res.json(processedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.addcomment = async (req, res) => {
  try {
    const comment = {
      comment: req.body.comment,
      userid: req.body.userid,
      createdAt: new Date(),
    };
    await postModel.findByIdAndUpdate(
      req.body.id,
      { $push: { comments: comment } },
      { new: true } // returns the updated document
    );
    res.json("commented");
  } catch (error) {
    console.error("Error updating concession:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the concession" });
  }
};

exports.likePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    let post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: "User has already liked the post" });
    }

    post.likes.push(userId);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.unlikePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await postModel.findByIdAndUpdate(
      postId,
      {
        $addToSet: { likes: userId },
        $pull: { likes: userId },
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deletepost = async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete(req.body.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getpostdetail = async (req, res) => {
  const getpostdetail = await postModel.findById(req.body.id);
  res.json(getpostdetail);
};

exports.updatePost = async (req, res) => {
  try {
    const { id, image, description } = req.body;

    if (!id || !image || !description) {
      console.log("Validation failed");
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid post ID");
      return res.status(400).json({ message: "Invalid post ID." });
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { image, description },
      { new: true }
    );

    if (!updatedPost) {
      console.log("Post not found");
      return res.status(404).json({ message: "Post not found." });
    }

    console.log("Post updated successfully");
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.reportpost = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { status }
    );
    console.log("Post updated successfully");
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};


exports.users =async(req,res)=>{
  const id=req.body.id;
  const users = await userModel.findById(id).populate("userid");
  res.json(users);
}



exports.updateprofile = async (req, res) => {
  try {
    const { id, email, password, name, image, dob, gender } = req.body;

    // Validation
    if (!id || !email || !password || !name || !image || !dob || !gender) {
      console.log("Validation failed");
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check for valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid user ID");
      return res.status(400).json({ message: "Invalid user ID." });
    }

    // Update userModel
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { email, password },
    );

    if (!updatedUser) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found." });
    }

    await userdetailModel.findByIdAndUpdate(
      updatedUser.userid,
      { name, image, dob, gender },
    );

    console.log("User profile updated successfully");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};


