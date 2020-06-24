const mongoose = require("mongoose");

const TestimonialSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  avatarUrl: {
      type:String,
  }
});

module.exports = mongoose.model("testimonial", TestimonialSchema);
