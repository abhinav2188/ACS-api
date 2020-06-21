const mongoose = require("mongoose");

//@schema Service
const ServiceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  headline: {
    type: String,
    trim: true,
    required: true,
  },
  serviceLogo: {
    type: String,
  },
  products:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

module.exports = mongoose.model("service", ServiceSchema);
