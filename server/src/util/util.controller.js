const path = require("path");

exports.fileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    const filename = file.name;

    const uploadpath = path.join(__dirname, "../uploads/" + filename);
    console.log(uploadpath)
    file.mv(uploadpath, async (err) => {
      console.log(err);
    });
    res.json("uploads/" + filename)

    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

