const router = require("express").Router();
const db = require("../config/db");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

let gfs;
db.conn.once("open", () => {
  gfs = Grid(db.conn.db, mongoose.mongo);
  gfs.collection("images");
});

// @desc retreive file
router.get("/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (err) res.status(400).json({ success:false,error: err.message });
      else {
        if (!file) res.status(404).json({ success:false,error: "file not found" });
        else {
          var readstream = gfs.createReadStream({ _id: file._id });
          readstream.pipe(res);
        }
      }
    });
});

module.exports = router;