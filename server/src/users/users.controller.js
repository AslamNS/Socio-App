const models = require("./users.model");

const userModel = models.user;
const userdetailModel = models.userdetail;

exports.register = async (req, res) => {
  try {
    const userdetailparam = {
      name: req.body.name,
      gender: req.body.gender,
      dob: req.body.dob,
      image: req.body.image,
      idproof: req.body.idproof
    };
    const users = await userdetailModel.create(userdetailparam);

    const userparam = {
      email: req.body.email,
      password: req.body.password,
      usertype: req.body.usertype,
      userid: users._id,
    };
    await userModel.create(userparam);
    res.json("success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "registration failed" });
  }
};




exports.login = async (req, res) => {
  try {
      let param = {
          email: req.body.email,
          password: req.body.password
      };

      const user = await userModel.findOne({ email: param.email }).populate('userid');

      if (user) {
          if (user.password === param.password) {
              if (user.usertype == 0 || user.usertype == 1 ) {
                  req.session.user = user; 
                  res.json(user);
              } else {
                  res.json("invalid");
              }
          } else {
              res.json("invalid");
          }
      } else {
          res.json("invalid");
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};












