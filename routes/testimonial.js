const router = require("express").Router();
const Testimonial = require("../model/Testimonial");
const db = require("../config/db");
const authorizeRequest = require("../middleware/authorize");

//@desc fetch all testimonials
router.get("/all", (req, res) => {
  Testimonial.find({}, (err, result) => {
    if (err) res.status(400).json("error fetching testimonials");
    else res.status(200).json(result);
  });
});

//@desc add new testimonial
router.post(
  "/",
  authorizeRequest,
  db.upload.single("testimonialAvatar"),
  (req, res) => {
    const data = req.body;
    const newTestimonial = new Testimonial({
      name: data.testimonialName,
      feedback: data.testimonialFeedback,
      avatarUrl: req.file ? req.file.filename : "",
    });
    newTestimonial.save((err) => {
      if (!err) res.status(201).json("created testimonial "+newTestimonial.name);
      else res.status(400).json(err.message);
    });
  }
);

//@desc retrieve a testimonial with its id
router.get("/:tid", (req, res) => {
  Testimonial.findOne({ _id: req.params.tid }, (err, result) => {
    if (err) res.status(400).json(err.message);
    else {
      if (!result) res.status(404).json("testimonial not found");
      else {
        res.status(200).json(result);
      }
    }
  });
});

//@desc delete a testimonial with its id
router.delete("/:tid", authorizeRequest, (req, res) => {
  Testimonial.findOneAndDelete({ _id: req.params.tid }, (err, result) => {
    if (err) res.status(400).json(err.message);
    else {
      if (!result) res.status(404).json("testimonial not found");
      else res.status(200).json("deleted testimonial " + result.name);
    }
  });
});

// @desc updata a testimonial data
router.patch(
  "/:tid",
  authorizeRequest,
  db.upload.single("testimonialAvatar"),
  (req, res) => {
    Testimonial.findOne({ _id: req.params.tid }, (err, testimonial) => {
      if (err) res.status(400).json(err.message);
      else {
        if (!testimonial) res.status(404).json("testimonial not found");
        else {
          if (req.body.testimonialName)
            testimonial.name = req.body.testimonialName;
          if (req.body.testimonialFeedback)
            testimonial.feedback = req.body.testimonialFeedback;
          if (req.file) testimonial.avatarUrl = req.file.filename;
          testimonial.save((err) => {
            if (!err)
              res.status(200).json("updated testimonial " + testimonial.name);
            else res.status(400).json(err.message);
          });
        }
      }
    });
  }
);

module.exports = router;
